import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import sequelize from './config/db.js'

import routes from './routes/index.js'
import authRoutes from './routes/authRoutes.js'
import viewRoutes from './routes/viewRoutes.js'

import session from 'express-session'

import path from 'path'
import { fileURLToPath } from 'url'

// 1. CREAR APP PRIMERO
const app = express()

// 2. PATHS PARA VISTAS
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log("📁 VIEWS PATH:", path.join(__dirname, 'views'))

// 3. CONFIGURAR PUG
app.set('view engine', 'pug')
app.set('views', './src/views')

// 4. MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true
  }
}))

// 5. RUTAS
app.use('/', viewRoutes)
app.use('/api/auth', authRoutes)
app.use('/api', routes)

// 6. ERROR HANDLER
app.use((err, req, res, next) => {
  console.error('❌ Error detectado:', err.message)
  res.status(err.statusCode || 500).json({
    error: err.message || 'Error interno del servidor'
  })
})

// START SERVER
const startServer = async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ Base de datos conectada en puerto 5440')

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