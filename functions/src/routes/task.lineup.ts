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
 router.get("/{id}", controller.get);

/**
 * Get current lineup
 */
router.get("/current", controller.getCurrentLineups);

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
 * @Body
 */
router.post("/next", roleVerifier(UserType.CHILD), controller.create);

/**
 * Update a Reward
 * @Note Only able to edit next week lineup
 * @Body 
 * @Params
 */
router.put("/next", roleVerifier(UserType.CHILD), controller.update);

/**
 * Update a task
 * @Note Only able to edit next week lineup
 * @Body 
 * @Params
 */
 router.put("/current/{id}", roleVerifier(UserType.CHILD), controller.update);

/**
 * Update a Reward
 * @Note Only able to approve current week lineup
 * @Body 
 * @Params
 */
 router.put("/current/approve/{id}", roleVerifier(UserType.PARENT), controller.approve);
 
/**
 * Update a Reward
 * @Note Only able to decline current week lineup
 * @Body 
 * @Params
 */
 router.put("/current/decline/{id}", roleVerifier(UserType.PARENT), controller.decline);

export default router;
