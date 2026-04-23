import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import sequelize from './config/db.js'

// 1. IMPORTANTE: Importamos el "index.js" que tienes en la carpeta routes
// Este archivo es el que ya contiene users, team, pokemon y products.
import routes from './routes/index.js'

import authRoutes from './routes/authRoutes.js'
import session from 'express-session'
import viewRoutes from './routes/viewRoutes.js'

const app = express() 

app.use(express.json()) 

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie:{
    secure: false, // true solo en https
    httpOnly: true
  }
}))

app.use('/', viewRoutes)

app.use('/api/auth', authRoutes)

app.use('/api', routes)

app.use((err, req, res, next) => {
  console.error('❌ Error detectado:', err.message)
  res.status(err.statusCode || 500).json({
    error: err.message || 'Error interno del servidor'
  })
})

const startServer = async () => {
  try {
    // Conecta al puerto 5440 de Docker
    await sequelize.authenticate()
    console.log('✅ Base de datos conectada en puerto 5440')

    // Sincroniza los modelos
    await sequelize.sync({ force: false })
    console.log('✅ Modelos sincronizados')

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`🚀 Servidor listo en http://localhost:${PORT}`)
      
    })

  } catch (error) {
    console.error('❌ Error al iniciar:', error)
  }
}

startServer()