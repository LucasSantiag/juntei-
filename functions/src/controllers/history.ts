import {NextFunction, Request, Response} from "express";
import * as functions from "firebase-functions";
import service from "../services/history";

const get = async (req: Request, res: Response, next: NextFunction) => {
  const uid = req.uid!;

  service.find(uid)
      .then((history) => {
        functions.logger.log("Get all rewards: ", req.uid);
        res.status(200).send(history);
      })
      .catch(next);
};

export default {
  get,
};
