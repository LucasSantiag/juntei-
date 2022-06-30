import * as functions from "firebase-functions";
import {getAuth} from "firebase-admin/auth";
import {Request, Response, NextFunction} from "express";

export const authenticateFirebase = async (req: Request, res: Response, next: NextFunction) => {
  const token = String(req.headers.authorization?.split("Bearer ")[1]);
  return getAuth()
      .verifyIdToken(token, true)
      .then((decodedToken) => {
        functions.logger.log("Successfully authenticated");
        const uid = decodedToken.uid;
        req.uid = uid;
        next();
      })
      .catch((e) => {
        functions.logger.error(e);
        res.sendStatus(401);
        next({
          "type": "error",
          "httpCode": 401,
        });
      });
};
