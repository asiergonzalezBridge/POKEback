import { Router } from "express";
import teamRouter from "./teamRouter.js";

const router = Router();

// Aquí conectamos las rutas de equipo al prefijo /team
router.use("/team", teamRouter);

export default router;