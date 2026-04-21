import express from "express";
import mainRouter from "./routers/index.js"; 

const app = express();

app.use(express.json());

// 🔍 DEBUG: Middleware de prueba
app.use((req, res, next) => {
    console.log(" Solicitud recibida:", req.method, req.path);
    next();
});

app.use("/api", mainRouter);

export default app;