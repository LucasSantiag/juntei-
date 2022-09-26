import {History, HistoryType} from "../models/History";
import {Reward} from "../models/Reward";
import {Task} from "../models/Task";

export const mapReward = (uid: string, reward: Reward) => {
  return {
    uid: uid,
    type: HistoryType.REWARD,
    description: reward.description,
    icon: reward.icon,
    price: reward.price,
    date: new Date().getDate(),
  } as History;
};

export const mapTask = (uid: string, task: Task) => {
  return {
    uid: uid,
    type: HistoryType.TASK,
    description: task.description,
    icon: task.icon,
    price: task.price,
    date: new Date().getDate(),
  } as History;
};
