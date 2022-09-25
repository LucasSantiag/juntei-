import {NextFunction, Request, Response} from "express";
import * as functions from "firebase-functions";
import {VideoRequest} from "../models/video";
import service from "../services/video";

const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  const uid = req.uid!;

  service.find(uid)
      .then((videos) => {
        functions.logger.log("Get all videos: ", req.uid);
        res.status(200).send(videos);
      })
      .catch(next);
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const video = req.body as VideoRequest;
  const uid = req.uid!;

  service.create(uid, video)
      .then(async (docRef) => {
        const taskInserted = Object.assign({}, {"id": docRef.id}, (await docRef.get()).data());
        functions.logger.log("Video created: ", docRef.id);
        res.status(200).send(taskInserted);
      })
      .catch(next);
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const video = req.body as VideoRequest;
  const uid = req.uid!;
  const id = req.params.id;

  service.update(id, uid, video)
      .then(() => {
        functions.logger.log("Video updated: ", id);
        res.status(204).send();
      })
      .catch(next);
};

const deleteVideo = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  service.deleteVideo(id)
      .then(() => {
        functions.logger.log("Video deleted: ", id);
        res.sendStatus(204);
      })
      .catch(next);
};


export default {
  getAllTasks,
  create,
  update,
  deleteVideo,
};
