import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5440, // Usa el 5440 de tu .env
    dialect: 'postgres',
    logging: false, // Mantiene la consola limpia
    define: {
      timestamps: false, // Tu SQL no tiene createdAt/updatedAt
      underscored: true  // Ayuda a mapear nombres como user_id
    }
  }
);

// Test rápido para confirmar la conexión al arrancar
sequelize.authenticate()
  .then(() => console.log(' Conexión exitosa a PostgreSQL en puerto 5440'))
  .catch(err => console.error(' Error de conexión:', err.message));

export default sequelize;