import {TokenStatus, UserRequest} from "../models/User";
import {db} from "../config/database";
import {checkUser, checkUsersByToken, mapRequest, mapToken} from "../utils/user.utils";
import userRelationshipService from "../services/user.relationship";
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
  userRelationshipService.deleteRelationship(uid);

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

export default {
  create,
  update,
  token,
  findByToken,
  find,
  updateTokenStatus,
};
