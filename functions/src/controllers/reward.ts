import {NextFunction, Request, Response} from "express";
import * as functions from "firebase-functions";
import {RewardRequest} from "../models/Reward";
import service from "../services/reward";

const getAllRewards = async (req: Request, res: Response, next: NextFunction) => {
  const uid = req.uid!;

  service.getAllRewards(uid)
      .then((rewards) => {
        functions.logger.log("Get all rewards: ", req.uid);
        res.status(200).send(rewards);
      })
      .catch(next);
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const reward = req.body as RewardRequest;
  const uid = req.uid!;

  service.create(uid, reward)
      .then(async (docRef) => {
        const rewardInserted = Object.assign({}, {"id": docRef.id}, (await docRef.get()).data());
        functions.logger.log("Reward created: ", docRef.id);
        res.status(201).send(rewardInserted);
      })
      .catch(next);
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const uid = req.uid!;
  const reward = req.body as RewardRequest;

  service.update(id, uid, reward)
      .then(() => {
        functions.logger.log("Reward updated: ", id);
        res.status(204).send();
      })
      .catch(next);
};

const deleteReward = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const uid = req.uid!;

  service.deleteReward(id, uid)
      .then(() => {
        functions.logger.log("Reward deleted: ", req.uid);
        res.sendStatus(204);
      })
      .catch(next);
};

export default {
  create,
  getAllRewards,
  update,
  deleteReward,
};
