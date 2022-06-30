import {NextFunction, Request, Response} from "express";
import * as functions from "firebase-functions";
import service from "../services/user";
import {UserRequest} from "../models/User";

const get = async (req: Request, res: Response, next: NextFunction) => {
  const uid = req.uid!;

  service.find(uid)
      .then((user) => {
        functions.logger.log("User get: ", req.uid);
        res.status(200).send(user.data());
      })
      .catch(next);
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const userReq = req.body as UserRequest;
  const uid = req.uid!;

  service.create(userReq, uid)
      .then((user) => {
        functions.logger.log("User created: ", req.uid);
        res.status(201).send(user);
      })
      .catch(next);
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const userReq = req.body as UserRequest;
  const uid = req.uid!;

  service.update(userReq, uid)
      .then(() => {
        functions.logger.log("User updated: ", req.uid);
        res.sendStatus(204);
      })
      .catch(next);
};

const getRelationshipToken = async (req: Request, res: Response, next: NextFunction) => {
  const uid = req.uid!;

  service.token(uid)
      .then((token) => {
        res.status(200).send(token);
      })
      .catch(next);
};

export default {
  get,
  create,
  update,
  getRelationshipToken,
};
