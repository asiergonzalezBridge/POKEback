import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db.js';

// Importamos el enrutador central y los modelos para asegurar que Sequelize los reconozca
import apiRouter from './routes/index.js'; 
import './models/teamModel.js'; 
// Importa aquí otros modelos si es necesario (ej. ./models/userModel.js)

dotenv.config();

const app = express(); 

// Middleware para procesar JSON
app.use(express.json()); 

// Conexión de todas las rutas bajo el prefijo /api
// Esto activa: /api/users, /api/team, /api/pokemon, /api/products
app.use('/api', apiRouter); 

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error('❌ Error detectado:', err.message);
  res.status(err.statusCode || 500).json({
    error: err.message || 'Error interno del servidor'
  });
});

const startServer = async () => {
  try {
    // 1. Autenticar conexión a la base de datos
    await sequelize.authenticate();
    console.log('✅ Conexión a PostgreSQL exitosa (Puerto 5440)');

    // 2. Sincronizar tablas (force: false evita borrar datos existentes)
    await sequelize.sync({ force: false });
    console.log('✅ Modelos y tablas sincronizados');

    // 3. Iniciar el servidor
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
      console.log(`🚀 Servidor funcionando en http://localhost:${PORT}`);
      console.log(`📡 Prueba rápida: curl http://localhost:${PORT}/api/team/1`);
    });

    // Manejo de errores específicos del servidor (como puerto ocupado)
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ El puerto ${PORT} ya está siendo usado por otro proceso.`);
      } else {
        console.error('❌ Error del servidor:', err);
      }
    });

  } catch (error) {
    console.error('❌ Error fatal al iniciar:', error.message);
    process.exit(1);
  }
};

startServer();
