import express from 'express'
import dotenv from 'dotenv'
import sequelize from './config/db.js'
import userRoutes from './routes/user.routes.js'

dotenv.config()

const app = express() // ✅ PRIMERO creas app

app.use(express.json()) // middleware

app.use('/api/users', userRoutes) // ✅ DESPUÉS lo usas

const startServer = async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ Conectado a la base de datos')

    await sequelize.sync()
    console.log('✅ Modelos sincronizados')

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
    })

  } catch (error) {
    console.error('❌ Error al iniciar:', error)
  }
}

startServer()
