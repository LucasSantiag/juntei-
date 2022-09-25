import {db} from "../config/database";
import {RewardRequest} from "../models/Reward";
import relationshipService from "../services/user.relationship";
import {checkReward, mapRequestDefault} from "../utils/reward.utils";
import userService from "../services/user";

/**
 * Get reward by id and validate if is related to user uid
 * @param {string} id
 * @param {string} uid
 */
const getById = async (id: string, uid: string) => {
  const relationshipId = (await relationshipService.getRelationshipByUid(uid)).ref.id;
  const rewardDb = await db.rewards
      .doc(id)
      .get();

  checkReward(relationshipId, rewardDb);
  return rewardDb;
};

const getAllRewards = async (uid: string) => {
  const rewards = await db.rewards
      .where("relationshipId", "==", (await relationshipService.getRelationshipByUid(uid)).ref.id)
      .where("deleted", "!=", true)
      .get();

  return rewards.docs.map((reward) => Object.assign({}, {"id": reward.id}, reward.data()));
};

const create = async (uid: string, reward: RewardRequest) => {
  const relationshipId = (await relationshipService.getRelationshipByUid(uid, true)).ref.id;

  return db.rewards
      .add(mapRequestDefault(reward, relationshipId));
};

const update = async (id: string, uid: string, reward: RewardRequest) => {
  const rewardDb = await getById(id, uid);

  await rewardDb
      .ref.update(reward);
};

const deleteReward = async (id: string, uid: string) => {
  const rewardDb = await getById(id, uid);

  await rewardDb
      .ref.update({deleted: true});
};

const redeemReward = async (id: string, uid: string) => {
  const taskDb = await getById(id, uid);
  const user = await userService.find(uid);

  const balance = user.data()?.balance ? 0 : user.data()!.balance;
  const quantity = taskDb.data()?.quantity ? 0 : taskDb.data()!.quantity;

  if (quantity <= 0) {
    throw new Error("Not Allowed");
  }

  if (balance - taskDb.data()!.price >= 0) {
    throw new Error("Not Allowed");
  }

  await userService.updateBalance(uid, 0 - taskDb.data()?.price!)
      .then(() => taskDb.ref.update({quantity: quantity - 1}));
};


export default {
  getAllRewards,
  create,
  update,
  deleteReward,
  redeemReward,
};
