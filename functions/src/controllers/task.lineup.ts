import {NextFunction, Request, Response} from "express";
import * as functions from "firebase-functions";
import {ConcludeRequest, TaskLineupRequest} from "../models/Task.Lineup";
import service from "../services/task.lineup";

const getAllLineups = (req: Request, res: Response, next: NextFunction) => {
  console.log("");
};

const get = (req: Request, res: Response, next: NextFunction) => {
  console.log("");
};

const getCurrentLineups = (req: Request, res: Response, next: NextFunction) => {
  console.log("");
};

const getNextLineup = (req: Request, res: Response, next: NextFunction) => {
  console.log("");
};

const getPreviousLineup = (req: Request, res: Response, next: NextFunction) => {
  console.log("");
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
  console.log("");
};

const decline = (req: Request, res: Response, next: NextFunction) => {
  console.log("");
};

export default {
  getAllLineups,
  get,
  getCurrentLineups,
  getNextLineup,
  getPreviousLineup,
  create,
  updateLineup,
  updateTask,
  approve,
  decline,
};
