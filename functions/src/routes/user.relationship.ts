import express, {Router} from "express";
import controller from "../controllers/user.relationship";
import {roleVerifier} from "../middleware/role.verifier";
import {UserType} from "../models/User";

const router: Router = express.Router();

/**
 * Create and update "Parent -> Childs" relationship.
 * Add childs only.
 * @Note Action PARENT restricted only.
 * @Body { childToken: string }
 * **/
router.post("/", roleVerifier(UserType.PARENT), controller.addRelationship);

export default router;
