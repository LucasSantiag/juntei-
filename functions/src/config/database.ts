import {getFirestore} from "firebase-admin/firestore";
import {Reward} from "../models/Reward";
import {Task} from "../models/Task";
import {User} from "../models/User";
import {UserRelationship} from "../models/User.Relationship";

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
};
