import app from "./app.js";
import sequelize from "./config/db.js";

const PORT = process.env.PORT || 3000;

async function main() {
    try {
        // Conexión a la base de datos
        await sequelize.authenticate();
        console.log("Conexion a la base de datos establecida.");

        // Sincronización de modelos con la base de datos
        await sequelize.sync({ force: false });
        console.log("Modelos sincronizados.");

        // Inicio del servidor
        app.listen(PORT, () => {
            console.log("Servidor escuchando en el puerto: " + PORT);
        });
    } catch (error) {
        console.error("Error al iniciar la aplicacion:", error);
    }
}

main();
