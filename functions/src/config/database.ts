import {getFirestore} from "firebase-admin/firestore";
import {Reward} from "../models/Reward";
import {Task} from "../models/Task";
import {TaskLineupRelation} from "../models/Task.Lineup";
import {User} from "../models/User";
import {Video} from "../models/Video";
import {UserRelationship} from "../models/User.Relationship";
import {History} from "../models/History";

const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as T,
});

const userConverter = () => ({
  toFirestore: (data: User) => data as User,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => {
    return snap.data() as User;
  },
});

export const db = {
  users: getFirestore().collection("users").withConverter(userConverter()),
  usersRelationshipToken: getFirestore().collection("users-relationship").withConverter(converter<UserRelationship>()),
  rewards: getFirestore().collection("rewards").withConverter(converter<Reward>()),
  tasks: getFirestore().collection("tasks").withConverter(converter<Task>()),
  taskLineup: getFirestore().collection("task-lineup").withConverter(converter<TaskLineupRelation>()),
  video: getFirestore().collection("video").withConverter(converter<Video>()),
  history: getFirestore().collection("history").withConverter(converter<History>()),
};
