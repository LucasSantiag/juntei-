import {startOfWeek, endOfWeek, formatISO} from "date-fns";
import shortid from "shortid";
import {MalformedBodyError, NotFoundError} from "../models/Error";
import {Task} from "../models/Task";
import {ConcludeRequest, TaskLineup, TaskLineupRelation, TaskLineupRequest, TaskRequest, TaskStatus, Week} from "../models/Task.Lineup";

export const checkEnumTaskStatus = (u: string) => {
  if (!Object.values(TaskStatus).includes(u as TaskStatus)) {
    throw new MalformedBodyError();
  }
  return u as TaskStatus;
};

export const getWeek = (date: Date) => {
  return {
    start: formatISO(startOfWeek(date, {weekStartsOn: 1})),
    end: formatISO(endOfWeek(date, {weekStartsOn: 1})),
  } as Week;
};

export const mapRequest = (req: TaskLineupRequest, uid: string) => {
  const date = new Date;
  date.setDate(date.getDate() + 7);
  return {
    "childId": uid,
    "week": getWeek(date),
    "taskLineup": req.taskLineup?.map((x) => {
      return mapTaskRequest(x);
    }),
  } as TaskLineupRelation;
};

export const mapTaskRequest = (req: TaskRequest) => {
  return {
    "id": shortid.generate(),
    "taskId": req.taskId,
    "position": req.position,
  } as TaskLineup;
};

export const mapConclusion = (req: ConcludeRequest, q: TaskLineupRelation) => {
  const childs = q.taskLineup?.map((i) => {
    if (i.id == req.taskId) {
      return {
        "id": i.id,
        "taskId": i.taskId,
        "position": i.position,
        "description": req.description,
        "mediaUrl": req.mediaUrl,
        "status": TaskStatus.DONE,
      };
    } else {
      return i;
    }
  });
  return {
    "childId": q.childId,
    "week": q.week,
    "taskLineup": childs,
  } as TaskLineupRelation;
};

export const mapTaskList = (task: FirebaseFirestore.DocumentSnapshot<Task>, taskLineup: TaskLineup) => {
  return Object.assign({}, {
    "id": taskLineup.id,
    "taskId": task.id,
    "status": taskLineup.status,
    "mediaUrl": taskLineup.mediaUrl,
    "description": taskLineup.description,
    "position": taskLineup.position,
    "icon": task.data()?.icon,
    "price": task.data()?.price,
    "taskDescription": task.data()?.description,
  });
};

export const checkTask = (taskLineup: FirebaseFirestore.DocumentSnapshot<TaskLineupRelation>) => {
  if (!taskLineup.data()) {
    throw new NotFoundError();
  }
};

export const approveById = (taskLineup: FirebaseFirestore.DocumentSnapshot<TaskLineupRelation>, id: string) => {
  return taskLineup.data()!.taskLineup!.map((taskId) => {
    if (id == taskId.id) {
      return {
        id: taskId.id,
        taskId: taskId.taskId,
        status: TaskStatus.APPROVED,
        description: taskId.description,
        mediaUrl: taskId.mediaUrl,
        position: taskId.position,
      };
    } else {
      return taskId;
    }
  });
};

export const declienById = (taskLineup: FirebaseFirestore.DocumentSnapshot<TaskLineupRelation>, id: string) => {
  return taskLineup.data()!.taskLineup!.map((taskId) => {
    if (id == taskId.id) {
      return {
        id: taskId.id,
        taskId: taskId.taskId,
        status: TaskStatus.DECLINED,
        description: taskId.description,
        mediaUrl: taskId.mediaUrl,
        position: taskId.position,
      };
    } else {
      return taskId;
    }
  });
};
