import {NotFoundError} from "../models/Error";
import {Reward, RewardRequest} from "../models/Reward";

export const checkReward = (relationshipId: string, reward: FirebaseFirestore.DocumentSnapshot<Reward>) => {
  if (!reward.data() || reward.data()?.relationshipId != relationshipId) {
    throw new NotFoundError();
  }
};

export const mapRequestDefault = (rewardReq: RewardRequest, relationshipId: string) => {
  return {
    description: rewardReq.description,
    icon: rewardReq.icon,
    quantity: rewardReq.quantity,
    price: rewardReq.price,
    relationshipId: relationshipId,
    deleted: false,
  } as Reward;
};

export const mapRequest = (rewardReq: RewardRequest, reward: Reward) => {
  return {
    description: rewardReq.description,
    icon: rewardReq.icon,
    quantity: rewardReq.quantity,
    price: rewardReq.price,
    relationshipId: reward.relationshipId,
    deleted: reward.deleted,
  } as Reward;
};
