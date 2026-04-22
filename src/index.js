import express from 'express'
import dotenv from 'dotenv'
import sequelize from './config/db.js'

// 1. IMPORTANTE: Importamos el "index.js" que tienes en la carpeta routes
// Este archivo es el que ya contiene users, team, pokemon y products.
import apiRouter from './routes/index.js' 

dotenv.config()

const app = express() 

app.use(express.json()) 

// 2. CONEXIÓN TOTAL: 
// En lugar de conectar una por una, conectamos el apiRouter.
// Esto activa automáticamente: /api/users, /api/team, /api/pokemon, etc.
app.use('/api', apiRouter) 

// Manejo de errores (tu código original)
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
      console.log(`📡 Probando equipo 1: curl http://localhost:3000/api/team/1`)
    })

  } catch (error) {
    console.error('❌ Error al iniciar:', error)
  }
}

startServer()