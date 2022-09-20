import express, {Router} from "express";
import controller from "../controllers/task";
import {roleVerifier} from "../middleware/role.verifier";
import {UserType} from "../models/User";

const router: Router = express.Router();

/**
 * Get all tasks avaiable
 */
router.get("/", controller.getAllTasks);

/**
 * Create a Task
 * @Note Action PARENT restricted only
 * @Body { description: string, icon: string, deleted: boolean }
 */
router.post("/", roleVerifier(UserType.PARENT), controller.create);

/**
 * Update a Task
 * @Note Action PARENT restricted only
 * @Body { description: string, icon: string, deleted: boolean }
 * @Params id: uid
 */
router.put("/:id", roleVerifier(UserType.PARENT), controller.update);

/**
 * Logical Task delete. Will not remove the document from database, only visibility
 * @Note Action PARENT restricted only
 * @Params id: uid
 */
router.delete("/:id", roleVerifier(UserType.PARENT), controller.deleteTask);

/**
 * Reedem Reward
 */
router.post("/redeemReward/:id", roleVerifier(UserType.CHILD), controller.getAllTasks);


export default router;
