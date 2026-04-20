import { Router } from "express";
import teamRouter from "./teamRouter.js";


const router = Router();

router.use("/team", teamRouter);

export default router;
