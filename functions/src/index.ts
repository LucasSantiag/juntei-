import * as admin from "firebase-admin";
admin.initializeApp();

import express, {Express} from "express";
import * as functions from "firebase-functions";

import {authenticateFirebase} from "./middleware/auth";
import {errorHandler} from "./middleware/error.handler";

import userRoute from "./routes/user";
import userRelationshipRoute from "./routes/user.relationship";
import rewardRoute from "./routes/reward";

const app: Express = express();

app.use(express.json());

app.use(authenticateFirebase);
app.use("/user", userRoute);
app.use("/relationship", userRelationshipRoute);
app.use("/reward", rewardRoute);
app.use(errorHandler);

exports.app = functions.https.onRequest(app);
