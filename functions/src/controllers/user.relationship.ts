import {NextFunction, Request, Response} from "express";
import * as functions from "firebase-functions";
import service from "../services/user.relationship";

const addRelationship = async (req: Request, res: Response, next: NextFunction) => {
  const childToken = req.body.childToken;
  const parentUid = req.uid!;
  service.addRelationship(parentUid, childToken)
      .then(() => {
        functions.logger.log("New relationship stablished");
        res.sendStatus(200);
      })
      .catch(next);
};

export default {
  addRelationship,
};
