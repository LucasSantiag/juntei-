import express, {Router} from "express";
import controller from "../controllers/video";
import {roleVerifier} from "../middleware/role.verifier";
import {UserType} from "../models/User";

const router: Router = express.Router();

/**
 * Get all Videos avaiable
 */
router.get("/", controller.getAllTasks);

/**
 * Create a Video
 * @Note Action PARENT restricted only
 * @Body { url: string }
 */
router.post("/", roleVerifier(UserType.PARENT), controller.create);

/**
 * Update a Video
 * @Note Action PARENT restricted only
 * @Body { url: string }
 * @Params id: uid
 */
router.put("/:id", roleVerifier(UserType.PARENT), controller.update);

/**
 * Video delete.
 * @Note Action PARENT restricted only
 * @Params id: uid
 */
router.delete("/:id", roleVerifier(UserType.PARENT), controller.deleteVideo);

export default router;
