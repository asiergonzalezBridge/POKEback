import express from 'express'
import dotenv from 'dotenv'
import sequelize from './config/db.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express() 

app.use(express.json()) 

app.use('/api/users', userRoutes) 

app.use((err, req, res, next) => {
  console.error(err)

  res.status(err.statusCode || 500).json({
    error: err.message || 'Error interno del servidor'
  })
})

app.set('views', './src/views')
app.set('view engine', 'pug')


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
