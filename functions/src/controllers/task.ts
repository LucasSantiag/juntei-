import {NextFunction, Request, Response} from "express";
import * as functions from "firebase-functions";
import {TaskRequest} from "../models/Task";
import service from "../services/task";

const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  const uid = req.uid!;

  service.getAllTasks(uid)
      .then((tasks) => {
        functions.logger.log("Get all tasks: ", req.uid);
        res.status(200).send(tasks);
      })
      .catch(next);
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const task = req.body as TaskRequest;
  const uid = req.uid!;

  service.create(uid, task)
      .then((tasks) => {
        functions.logger.log("Task created: ", task);
        res.status(200).send(tasks);
      })
      .catch(next);
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const task = req.body as TaskRequest;
  const uid = req.uid!;
  const id = req.params.id;

  service.update(id, uid, task)
      .then(() => {
        functions.logger.log("Task updated: ", id);
        res.status(204).send();
      })
      .catch(next);
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  const uid = req.uid!;
  const id = req.params.id;

  service.deleteTask(id, uid)
      .then(() => {
        functions.logger.log("Task deleted: ", id);
        res.sendStatus(204);
      })
      .catch(next);
};

export default {
  getAllTasks,
  create,
  update,
  deleteTask,
};
