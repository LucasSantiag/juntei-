import {NextFunction, Request, Response} from "express";
import * as functions from "firebase-functions";
import {ConcludeRequest, TaskLineupRequest} from "../models/Task.Lineup";
import service from "../services/task.lineup";

const getAllLineups = (req: Request, res: Response, next: NextFunction) => {
  const uid = req.uid!;

  service.findAllLineups(uid)
      .then((taskLineup) => {
        functions.logger.log("TaskLineup got: ", req.uid);
        res.status(200).send(taskLineup);
      })
      .catch(next);
};

const get = (req: Request, res: Response, next: NextFunction) => {
  const uid = req.uid!;
  const id = req.params.id;

  service.findById2(uid, id)
      .then((taskLineup) => {
        functions.logger.log("TaskLineup got: ", req.uid);
        res.status(200).send(taskLineup);
      })
      .catch(next);
};

const getNextLineup = (req: Request, res: Response, next: NextFunction) => {
  const uid = req.uid!;

  service.findNextWeek2(uid)
      .then((taskLineup) => {
        functions.logger.log("TaskLineup got: ", req.uid);
        res.status(200).send(taskLineup);
      })
      .catch(next);
};

const getCurrentLineup = (req: Request, res: Response, next: NextFunction) => {
  const uid = req.uid!;

  service.findCurrentWeek2(uid)
      .then((taskLineup) => {
        functions.logger.log("TaskLineup got: ", req.uid);
        res.status(200).send(taskLineup);
      })
      .catch(next);
};

const getPreviousLineup = (req: Request, res: Response, next: NextFunction) => {
  const uid = req.uid!;

  service.findPreviousWeek2(uid)
      .then((taskLineup) => {
        functions.logger.log("TaskLineup got: ", req.uid);
        res.status(200).send(taskLineup);
      })
      .catch(next);
};

const create = (req: Request, res: Response, next: NextFunction) => {
  const userReq = req.body as TaskLineupRequest;
  const uid = req.uid!;

  service.create(userReq, uid)
      .then((taskLineup) => {
        functions.logger.log("TaskLineup created: ", req.uid);
        res.status(201).send(taskLineup);
      })
      .catch(next);
};

const updateLineup = (req: Request, res: Response, next: NextFunction) => {
  const userReq = req.body as TaskLineupRequest;
  const uid = req.uid!;

  service.updateLineup(userReq, uid)
      .then((taskLineup) => {
        functions.logger.log("TaskLineup created: ", req.uid);
        res.status(200).send(taskLineup);
      })
      .catch(next);
};

const updateTask = (req: Request, res: Response, next: NextFunction) => {
  const userReq = req.body as ConcludeRequest;
  const uid = req.uid!;

  service.updateTask(userReq, uid)
      .then((taskLineup) => {
        functions.logger.log("TaskLineup created: ", req.uid);
        res.status(200).send(taskLineup);
      })
      .catch(next);
};

const approve = (req: Request, res: Response, next: NextFunction) => {
  const uid = req.uid!;
  const weekId = req.params.weekId;
  const id = req.params.id;

  service.approve(uid, id, weekId)
      .then((taskLineup) => {
        functions.logger.log("Task approved: ", req.uid);
        res.status(200).send(taskLineup);
      })
      .catch(next);
};

const decline = (req: Request, res: Response, next: NextFunction) => {
  const uid = req.uid!;
  const weekId = req.params.weekId;
  const id = req.params.id;

  service.decline(uid, id, weekId)
      .then((taskLineup) => {
        functions.logger.log("Task approved: ", req.uid);
        res.status(200).send(taskLineup);
      })
      .catch(next);
};

export default {
  getAllLineups,
  get,
  getCurrentLineup,
  getNextLineup,
  getPreviousLineup,
  create,
  updateLineup,
  updateTask,
  approve,
  decline,
};
