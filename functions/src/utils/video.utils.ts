import {Video, VideoRequest} from "../models/Video";

export const mapRequest = (req: VideoRequest, uid: string) => {
  return {
    url: req.url,
    uid: uid,
  } as Video;
};
