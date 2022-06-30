import {NotFoundError} from "../models/Error";
import {Task, TaskRequest} from "../models/Task";

export const checkTask = (relationshipId: string, reward: FirebaseFirestore.DocumentSnapshot<Task>) => {
  if (!reward.data() || reward.data()?.relationshipId != relationshipId) {
    throw new NotFoundError();
  }
};

export const mapRequest = (taskReq: TaskRequest, relationshipId: string) => {
  return {
    relationshipId: relationshipId,
    description: taskReq.description,
    icon: taskReq.icon,
    deleted: false,
  } as Task;
};
