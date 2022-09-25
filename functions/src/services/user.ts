import {TokenStatus, UserRequest} from "../models/User";
import {db} from "../config/database";
import {checkUser, checkUsersByToken, mapRequest, mapToken, mapUserList} from "../utils/user.utils";
import userRelationshipService from "../services/user.relationship";
import taskLineupService from "../services/task.lineup";
import * as shortid from "shortid";

/**
 * Get user by id and validate if exists
 * @param {string} uid
 */
const find = async (uid: string) => {
  const user = await db.users
      .doc(uid)
      .get();

  checkUser(user);
  return user;
};

const findChilds = async (uid: string) => {
  const relationship = await (await userRelationshipService.getRelationshipByUid(uid)).ref.get();

  if (relationship.data()?.childs?.length == 0) {
    return [{}];
  }

  const childs = relationship.data()!.childs!.map(async (id)=> {
    const usr = db.users
        .doc(id)
        .get();
    const lineup = await taskLineupService.findCurrentWeek2(id);
    const approvedBalance = await taskLineupService.getCurrentWeekApprovedBalance(id);
    const totalBalance = await taskLineupService.getCurrentWeekTotalBalance(id);
    return usr.then((user) => {
      return mapUserList(user, approvedBalance, totalBalance, lineup);
    });
  });

  return await Promise.all(childs);
};

const findByToken = async (token: string) => {
  const users = await db.users
      .where("token.tokenId", "==", token)
      .where("token.status", "==", TokenStatus.PENDING)
      .get();

  checkUsersByToken(users);
  return users.docs[0];
};

const create = async (userReq: UserRequest, uid: string) => {
  return db.users
      .doc(uid)
      .create(mapRequest(userReq));
};

const update = async (userReq: UserRequest, uid: string) => {
  const user = await find(uid);

  const userData = user.data();

  if (userData && userData.role != userReq.role) {
    userRelationshipService.deleteRelationship(uid);
    updateTokenStatus(uid, TokenStatus.CANCELLED);
  }

  user.ref.update(userReq);
};

const token = async (uid: string) => {
  const relationshipToken = shortid.generate();
  const token = mapToken(relationshipToken);

  (await find(uid)).ref
      .update({token: token});

  return token;
};

const updateTokenStatus = async (uid: string, status: TokenStatus) => {
  return (await find(uid)).ref
      .update({
        token: {status: status},
      });
};

const updateBalance = async (uid: string, balance: number) => {
  const user = await find(uid);
  return user.ref
      .update({
        balance: {balance: !user.data()?.balance ? balance : balance + user.data()?.balance!},
      });
};

export default {
  create,
  update,
  token,
  findByToken,
  find,
  updateTokenStatus,
  findChilds,
  updateBalance,
};
