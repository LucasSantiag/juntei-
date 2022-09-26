import {db} from "../config/database";
import {Reward} from "../models/Reward";
import {Task} from "../models/Task";
import {mapReward, mapTask} from "../utils/history.utils";

const saveReward = async (uid: string, reward: Reward) => {
  const rewardAsHistory = mapReward(uid, reward);

  db.history.add(rewardAsHistory);
};

const saveTask = async (uid: string, task: Task) => {
  const taskAsHistory = mapTask(uid, task);

  db.history.add(taskAsHistory);
};

const find = async (uid: string) => {
  const video = await db.history
      .where("uid", "==", uid)
      .get();

  return video.docs.map((video) => Object.assign({}, {"id": video.id}, video.data()));
};

export default {
  find,
  saveTask,
  saveReward,
};
