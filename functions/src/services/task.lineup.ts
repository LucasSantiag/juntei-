import {db} from "../config/database";
import {LineupAlreadyExists} from "../models/Error";
import {TaskLineupRequest} from "../models/Task.Lineup";
import {mapRequest, getWeek} from "../utils/task.lineup";

const findNextWeek = async (uid: string) => {
  const date = new Date;
  date.setDate(date.getDate() + 7);

  return db.taskLineup
      .where("childId", "==", uid)
      .where("week", "==", getWeek(date))
      .get();
};

const update = async (req: TaskLineupRequest, uid: string) => {
  //  Todo: FIX
  const date = new Date;
  date.setDate(date.getDate() + 7);

  return db.taskLineup
      .where("childId", "==", uid)
      .where("week", "==", getWeek(date))
      .get();
};

const create = async (req: TaskLineupRequest, uid: string) => {
  const existsWeekLineup = await findNextWeek(uid);

  if (!existsWeekLineup.empty) {
    throw new LineupAlreadyExists();
  }

  return db.taskLineup
      .doc()
      .create(mapRequest(req, uid));
};

export default {
  findNextWeek,
  create,
  update,
};
