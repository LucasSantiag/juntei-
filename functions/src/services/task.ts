import {TaskRequest} from "../models/Task";
import {db} from "../config/database";
import relationshipService from "../services/user.relationship";
import {mapRequest, checkTask} from "../utils/task.utils";

const getById = async (id: string, uid: string) => {
  const relationshipId = (await relationshipService.getRelationshipByUid(uid)).ref.id;
  const task = await db.tasks
      .doc(id)
      .get();

  checkTask(relationshipId, task);
  return task;
};

const getAllTasks = async (uid: string) => {
  const tasks = await db.tasks
      .where("relationshipId", "==", (await relationshipService.getRelationshipByUid(uid)).ref.id)
      .where("deleted", "!=", true)
      .get();

  return tasks.docs.map((task) => {
    task.id, task.data();
  });
};

const create = async (uid: string, task: TaskRequest) => {
  const relationshipId = (await relationshipService.getRelationshipByUid(uid, true)).ref.id;

  db.tasks
      .add(mapRequest(task, relationshipId));
};

const update = async (id: string, uid: string, task: TaskRequest) => {
  const taskDb = await getById(id, uid);

  await taskDb
      .ref.update(task);
};

const deleteTask = async (id: string, uid: string) => {
  const taskDb = await getById(id, uid);

  await taskDb
      .ref.update({deleted: true});
};

export default {
  getAllTasks,
  create,
  update,
  deleteTask,
};
