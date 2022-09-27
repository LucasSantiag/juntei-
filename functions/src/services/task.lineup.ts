import {db} from "../config/database";
import {LineupAlreadyExists} from "../models/Error";
import {ConcludeRequest, TaskLineup, TaskLineupRequest, TaskStatus} from "../models/Task.Lineup";
import userService from "../services/user";
import historyService from "../services/history";
import {mapRequest, getWeek, mapConclusion, mapTaskList, checkTask, approveById, declienById, mapTaskRequest} from "../utils/task.lineup";

const findById = async (uid: string, id: string) => {
  const lineup = await db.taskLineup
      .doc(id)
      .get();

  checkTask(lineup);
  return lineup;
};

const findById2 = async (uid: string, id: string) => {
  let lineup: any = await findById(uid, id);

  if (lineup.data()!.taskLineup) {
    const taskList = lineup.data()!.taskLineup!.map(async (id: TaskLineup)=> {
      const task = db.tasks
          .doc(id.taskId)
          .get();
      return task.then((tsk) => {
        return mapTaskList(tsk, id);
      });
    });

    lineup = lineup.data();
    lineup.taskLineup = await Promise.all(taskList);
  } else {
    lineup = lineup.data();
  }
  return lineup;
};

const findAllLineups = async (uid: string) => {
  const lineup = await db.taskLineup
      .where("childId", "==", uid)
      .get();

  return lineup.docs.map((data) => {
    return Object.assign({}, {"id": data.ref.id}, data.data());
  });
};

const findPreviousWeek2 = async (uid: string) => {
  const date = new Date;
  date.setDate(date.getDate() - 7);

  return findByWeek(uid, date);
};

const findNextWeek2 = async (uid: string) => {
  const date = new Date;
  date.setDate(date.getDate() + 7);

  return findByWeek(uid, date);
};


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

const findCurrentWeek2 = async (uid: string) => {
  const date = new Date;

  return findByWeek(uid, date);
};

const updateLineup = async (req: TaskLineupRequest, uid: string) => {
  const lineup = await findNextWeek(uid);

  const taskList = {
    "taskLineup": req.taskLineup?.map((task) => mapTaskRequest(task)),
  };

  return lineup.docs[0]
      .ref
      .update(taskList);
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

const approve = async (uid: string, id: string, weekId: string) => {
  const lineup = await findById(uid, weekId);

  const task = await db.tasks
      .doc(lineup.data()?.taskLineup?.filter((idTaskLineup)=> id == idTaskLineup.id)[0].taskId!)
      .get();

  userService.updateBalance(lineup.data()!.childId, task.data()?.price!);

  await historyService.saveTask(lineup.data()!.childId, task.data()!);

  return lineup.ref.update({
    taskLineup: approveById(lineup, id),
  });
};

const decline = async (uid: string, id: string, weekId: string) => {
  const lineup = await findById(uid, weekId);

  return lineup.ref.update({
    taskLineup: declienById(lineup, id),
  });
};

const getCurrentWeekTotalBalance = async (uid: string) => {
  const week = await findCurrentWeek2(uid);

  if (week == undefined) {
    return 0;
  }

  return week.taskLineup.reduce((current: number, task: { price: number; }) => {
    return current + task.price;
  }, 0);
};

const getCurrentWeekApprovedBalance = async (uid: string) => {
  const week = await findCurrentWeek2(uid);

  if (week == undefined) {
    return 0;
  }

  return week.taskLineup.reduce((current: number, task: { price: number, status: TaskStatus; } ) => {
    if (task.status == TaskStatus.APPROVED) {
      return current + task.price;
    } else {
      return current;
    }
  }, 0);
};

const findByWeek = async (uid: string, date: Date) => {
  let lineup: any = (await db.taskLineup
      .where("childId", "==", uid)
      .where("week", "==", getWeek(date))
      .get())
      .docs[0];

  if (!lineup) {
    return lineup;
  }

  const lineupId = lineup.ref.id;

  if (lineup.data()!.taskLineup) {
    const taskList = await lineup.data()!.taskLineup!.map(async (id: TaskLineup)=> {
      const task = db.tasks
          .doc(id.taskId)
          .get();
      return task.then((tsk) => {
        return mapTaskList(tsk, id);
      });
    });
    lineup = lineup.data();
    lineup.taskLineup = await Promise.all(taskList);
  } else {
    lineup = lineup.data();
  }

  return Object.assign({}, {id: lineupId}, lineup);
};

export default {
  findNextWeek,
  findCurrentWeek,
  findCurrentWeek2,
  findNextWeek2,
  findById2,
  findPreviousWeek2,
  findAllLineups,
  create,
  updateLineup,
  updateTask,
  findById,
  approve,
  decline,
  getCurrentWeekTotalBalance,
  getCurrentWeekApprovedBalance,
};
