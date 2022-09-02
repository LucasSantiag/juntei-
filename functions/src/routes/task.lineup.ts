import express, {Router} from "express";
import {roleVerifier} from "../middleware/role.verifier";
import controller from "../controllers/task.lineup";
import {UserType} from "../models/User";

const router: Router = express.Router();

/**
 * Get all lineups
 */
router.get("/", controller.getAllLineups);

/**
 * Get id lineup
 */
router.get("/:id", controller.get);

/**
 * Get current lineup
 */
router.get("/current", controller.getCurrentLineup);

/**
 * Get next lineup
 */
router.get("/next", controller.getNextLineup);

/**
 * Get previous lineup
 */
router.get("/previous", controller.getPreviousLineup);

/**
 * Create a new Lineup
 * @Note Automatically assing to next week
 * @Body [taskId1, taskId2, ...]
 */
router.post("/next", roleVerifier(UserType.CHILD), controller.create);

/**
 * Update a lineup
 * @Note Only able to edit next week lineup
 * @Body [{taskId1: string}, {taskId2: string}, ...]
 */
router.put("/next", roleVerifier(UserType.CHILD), controller.updateLineup);

/**
 * Update task status from current lineup
 * @Note Only able to update current week lineup
 * @Body {taskId: string, description: string, mediaUrl: string }
 */
router.put("/current", roleVerifier(UserType.CHILD), controller.updateTask);

/**
 * Approves id task from current lineup
 * @Note Only able to approve current week lineup
 * @Params taskId from current lineup
 */
router.put("/week/:weekId/approve/:id", roleVerifier(UserType.PARENT), controller.approve);

/**
 * Approves id task from current lineup
 * @Note Only able to decline current week lineup
 * @Params taskId from current lineup
 */
router.put("/week/:weekId/decline/:id", roleVerifier(UserType.PARENT), controller.decline);

export default router;
