import {db} from "../config/database";
import {NotFoundError} from "../models/Error";
import {TokenStatus, UserType} from "../models/User";
import {UserRelationship} from "../models/User.Relationship";
import userService from "../services/user";
import {checkCurrentRelationship} from "../utils/user.relationship.utils";


/**
 * @Warn if user is PARENT will try to find the current relationship or create an childless realtionship
 * @Warn if user is CHILD will try to find the current relationship or error
 * @param {string} uid
 * @param {boolean} createIfNull
 */
const getRelationshipByUid = async (uid: string, createIfNull = false) => {
  const user = await userService.find(uid);

  if (user.data()!.role == UserType.PARENT) {
    const relationship = await db.usersRelationshipToken
        .where("parent", "==", uid)
        .get();

    if (!relationship.docs[0]) {
      if (createIfNull) {
        return (await addChildlessRelationship(uid)).get();
      }
      throw new NotFoundError();
    }

    return relationship.docs[0];
  } else {
    const relationship = await db.usersRelationshipToken
        .where("childs", "array-contains", uid)
        .get();

    if (!relationship.docs[0]) {
      throw new NotFoundError();
    }

    return relationship.docs[0];
  }
};

const addChildlessRelationship = async (uid: string) => {
  const relationship: UserRelationship = {
    parent: uid,
  };
  return db.usersRelationshipToken
      .add(relationship);
};

const addRelationship = async (parentUid: string, childToken: string) => {
  const child = (await userService.findByToken(childToken)).ref;

  const currentRelationship = await getRelationshipByUid(parentUid, true);

  const relationship: UserRelationship = {
    parent: parentUid,
    childs: checkCurrentRelationship(child.id, currentRelationship ? currentRelationship.data()!.childs : []),
  };

  await userService.updateTokenStatus(child.id, TokenStatus.SUCCESS);

  if (!currentRelationship) {
    db.usersRelationshipToken
        .add(relationship);
  } else {
    db.usersRelationshipToken
        .doc(currentRelationship.id)
        .set(relationship);
  }
};

/**
 *  @Warn If uid is PARENT delete all relationship attached to itself and childs
 *  @Warn If uid is CHILD will junts remove the child from parent relationship
 *  @param {string} uid
 */
const deleteRelationship = async (uid: string) => {
  const user = await userService.find(uid);

  const relationship = await getRelationshipByUid(uid)
      .catch(() => {
        return null;
      });

  if (relationship && user.data()?.role == UserType.PARENT) {
    relationship.ref.delete();
    relationship.data()!.childs?.forEach((childId) =>
      userService.updateTokenStatus(childId, TokenStatus.CANCELLED));
  } else {
    if (relationship && relationship.data()!.childs) {
      const oldRelationship = relationship.data()!;
      const indexOfChild = relationship.data()!.childs!.indexOf(uid);
      oldRelationship.childs!.splice(indexOfChild, 1);

      relationship.ref.update(oldRelationship);
    }
  }
};

export default {
  addRelationship,
  deleteRelationship,
  getRelationshipByUid,
};
