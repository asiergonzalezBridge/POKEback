import dotenv from 'dotenv'
dotenv.config()

import { Sequelize } from 'sequelize'

console.log('PUERTO DB:', process.env.DB_PORT)

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5440,
    dialect: 'postgres',
    logging: false
  }
)

export default sequelize