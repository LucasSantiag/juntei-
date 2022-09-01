import {db} from "../config/database";
import {LineupAlreadyExists} from "../models/Error";
import {ConcludeRequest, TaskLineupRequest} from "../models/Task.Lineup";
import {mapRequest, getWeek, mapConclusion} from "../utils/task.lineup";

const findNextWeek = async (uid: string) => {
  const date = new Date;
  date.setDate(date.getDate() + 7);

  return db.taskLineup
      .where("childId", "==", uid)
      .where("week", "==", getWeek(date))
      .get();
};

const findCurrentWeek = async (uid: string) => {
  const date = new Date;

  return db.taskLineup
      .where("childId", "==", uid)
      .where("week", "==", getWeek(date))
      .get();
};

const updateLineup = async (req: TaskLineupRequest, uid: string) => {
  const lineup = await findNextWeek(uid);

  return lineup.docs[0]
    .ref
    .update(req);
};

const updateTask = async (req: ConcludeRequest, uid: string) => {
  const lineup = await findCurrentWeek(uid);

  return lineup.docs[0]
    .ref
    .update(mapConclusion(req, lineup.docs[0].data()));
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
  updateLineup,
  updateTask,
};
