import { Router } from "express";
import * as teamController from "../controllers/teamController.js";

const router = Router();

router.get("/:userId", teamController.getTeam);
router.post("/", teamController.createTeamMember);
router.delete("/:id", teamController.deleteTeamMember);

export default router;
