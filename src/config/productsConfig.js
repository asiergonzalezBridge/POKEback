import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

console.log('PUERTO DB:', process.env.DB_PORT)

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  }
)

// Test de conexión 
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos correcta')
  })
  .catch((err) => {
    console.error('Error de conexión a la base de datos:', err)
  })

export default sequelize