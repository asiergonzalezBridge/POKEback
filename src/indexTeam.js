import app from "./appTeam.js"; 
import sequelize from "./config/db.js";
import "./models/teamModel.js";

const PORT = 3000;

try {
    console.log("Iniciando servidor...");
    
    await sequelize.authenticate();
    console.log("Conexion a la base de datos establecida.");

    await sequelize.sync({ force: false }); 
    console.log("Tablas sincronizadas.");

    const server = app.listen(PORT, () => {
        console.log("Servidor escuchando en http://localhost:" + PORT);
    });

    server.on('error', (err) => {
        console.error('❌ Error del servidor:', err);
    });

} catch (error) {
    console.error("❌ Error fatal al iniciar:", error.message);
    console.error(error.stack);
    process.exit(1);
}