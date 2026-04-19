import { Router } from "express";
import teamRouter from "./teamRouter.js";

const router = Router();

// Redirige lo que llegue a /api/team hacia el teamRouter
router.use("/team", teamRouter);

export default router;
