import {startOfWeek, endOfWeek} from "date-fns";
import shortid from "shortid";
import {MalformedBodyError} from "../models/Error";
import {ConcludeRequest, TaskLineup, TaskLineupRelation, TaskLineupRequest, TaskRequest, TaskStatus, Week} from "../models/Task.Lineup";

export const checkEnumTaskStatus = (u: string) => {
  if (!Object.values(TaskStatus).includes(u as TaskStatus)) {
    throw new MalformedBodyError();
  }
  return u as TaskStatus;
};

export const getWeek = (date: Date) => {
  return {
    start: startOfWeek(date, {weekStartsOn: 1}),
    end: endOfWeek(date, {weekStartsOn: 1}),
  } as Week;
};

export const mapRequest = (req: TaskLineupRequest, uid: string) => {
  const date = new Date;
  date.setDate(date.getDate() + 7);
  return {
    "childId": uid,
    "week": getWeek(date),
    "taskLineup": req.taskLineup,
  } as TaskLineupRelation;
};

export const mapTaskRequest = (req: TaskRequest) => {
  return {
    "id": shortid.generate(),
    "taskId": req.taskId,
  } as TaskLineup;
};

export const mapConclusion = (req: ConcludeRequest, q: TaskLineupRelation) => {
  const childs = q.taskLineup?.map((i) => {
    if (i.taskId == req.taskId){
      return {
        "taskId": req.taskId,
        "description": req.description,
        "mediaUrl": req.mediaUrl,
      };
    }
    else {
      return i;
    }
  });
  return {
    "childId": q.childId,
    "week": q.week,
    "taskLineup": childs,
  } as TaskLineupRelation;
};
