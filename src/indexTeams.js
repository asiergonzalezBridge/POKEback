import app from "./app.js";
import sequelize from "./config/db.js";

const PORT = 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Conexion a la base de datos establecida.");

        app.listen(PORT, () => {
            console.log("Servidor ejecutandose en el puerto " + PORT);
        });
        
    } catch (error) {
        console.error("No se pudo iniciar el servidor debido a un error en la base de datos:", error);
        process.exit(1); 
    }
}

startServer();
