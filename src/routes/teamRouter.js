import { Router } from "express";
import teamController from "../../controllers/api/teamController.js";

const router = Router();

//ruta para equipo
router.get("/:userId", teamController.getTeam);

// ruta añadir equipo
router.post("/", teamController.postPokemon);

// ruta para eliminar
router.delete("/:id", teamController.deletePokemon);

export default router;
