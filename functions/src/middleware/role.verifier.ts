import {Request, Response, NextFunction} from "express";
import {db} from "../config/database";

export const roleVerifier = (role: string) => async (req: Request, res: Response, next: NextFunction) => {
  db.users
      .doc(req.uid!)
      .get()
      .then((user) => {
        if (role == user.data()?.role) {
          next();
        } else {
          res.status(400).send({message: "User role invalid"});
          next({
            "type": "error",
            "httpCode": 400,
          });
        }
      });
};
