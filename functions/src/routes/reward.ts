import express, {Router} from "express";
import controller from "../controllers/reward";
import {roleVerifier} from "../middleware/role.verifier";
import {UserType} from "../models/User";

const router: Router = express.Router();

/**
 * Get all rewards avaiable
 */
router.get("/", controller.getAllRewards);

/**
 * Create a Reward
 * @Note Action PARENT restricted only
 * @Body { description: string, icon: string, quantity: number, price: number }
 */
router.post("/", roleVerifier(UserType.PARENT), controller.create);

/**
 * Update a Reward
 * @Note Action PARENT restricted only
 * @Body { description: string, icon: string, quantity: number, price: number }
 * @Params id: uid
 */
router.put("/:id", roleVerifier(UserType.PARENT), controller.update);

/**
 * Logical Reward delete. Will not remove the document from database, only visibility
 * @Note Action PARENT restricted only
 * @Params id: uid
 */
router.delete("/:id", roleVerifier(UserType.PARENT), controller.deleteReward);


export default router;
