import {db} from "../config/database";
import {VideoRequest} from "../models/Video";
import {mapRequest} from "../utils/video.utils";

const findById = async (id: string) => {
  const user = await db.video
      .doc(id)
      .get();

  return user;
};

/**
 * Get user by id and validate if exists
 * @param {string} uid
 */
const find = async (uid: string) => {
  const user = await db.video
      .where("uid", "==", uid)
      .get();

  return user.docs;
};

const create = async (uid: string, videoReq: VideoRequest) => {
  return db.video
      .add(mapRequest(videoReq, uid));
};

const update = async (id: string, uid: string, videoReq: VideoRequest) => {
  const video = await findById(id);

  await video
      .ref.update(mapRequest(videoReq, uid));
};

const deleteVideo = async (id: string) => {
  const video = await findById(id);

  await video
      .ref.delete();
};

export default {
  find,
  create,
  update,
  deleteVideo,
};
