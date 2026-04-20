import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import sequelize from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express() 

app.use(express.json()) 
app.use('/api/auth', authRoutes)

app.use('/api/users', userRoutes) 

app.use((err, req, res, next) => {
  console.error(err)

  res.status(err.statusCode || 500).json({
    error: err.message || 'Error interno del servidor'
  })
})

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
