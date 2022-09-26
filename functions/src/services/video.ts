import {db} from "../config/database";
import {VideoRequest} from "../models/Video";
import {mapRequest} from "../utils/video.utils";
import relationshipService from "../services/user.relationship";

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
  const relationshipId = (await relationshipService.getRelationshipByUid(uid)).ref.id;

  const video = await db.video
      .where("uid", "==", relationshipId)
      .get();

  return video.docs.map((video) => Object.assign({}, {"id": video.id}, video.data()));
};

const create = async (uid: string, videoReq: VideoRequest) => {
  const relationshipId = (await relationshipService.getRelationshipByUid(uid)).ref.id;

  return db.video
      .add(mapRequest(videoReq, relationshipId));
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
