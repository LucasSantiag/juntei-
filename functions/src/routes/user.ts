import express, {Router} from "express";
import controller from "../controllers/user";
import {roleVerifier} from "../middleware/role.verifier";
import {UserType} from "../models/User";

const router: Router = express.Router();

/**
 * Create user
 * Collection id is the same UID from Firebase Authentication
 * @Body { userType: string }
 * */
router.post("/", controller.create);

/**
 * Generate token to add parent relationship
 * @Note Token lasts 15 minutes
 * @Note Action CHILD restricted only
 * @Warn If there is any relationship, will DELETE and generate a new Token (only one relationship allowed).
 * */
router.post("/token", roleVerifier(UserType.CHILD), controller.getRelationshipToken);

/**
 * Update user
 * @Warn If the user role (PARENT or CHILD) changes, any relationship existent will be DELETED.
 * @Warn All data from a DELETED relationship cannot be accessed.
 * @Body { userType: string }
 * */
router.put("/", controller.update);

export default router;
