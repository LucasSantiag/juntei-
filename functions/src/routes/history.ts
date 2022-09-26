import express, {Router} from "express";
import controller from "../controllers/history";
import {roleVerifier} from "../middleware/role.verifier";
import {UserType} from "../models/User";

const router: Router = express.Router();

router.get("/", roleVerifier(UserType.CHILD), controller.get);

export default router;
