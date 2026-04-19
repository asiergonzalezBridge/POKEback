import express from "express";
import apiRouter from "./routes/api/index.js";

const app = express();

// Middleware para interpretar JSON en el body de las peticiones
app.use(express.json());

// Prefijo global para todas las rutas de la API
app.use("/api", apiRouter);

export default app;
