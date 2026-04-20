import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'

// 🔐 REGISTER
const register = async ({ username, email, password, poketype }) => {

  // VALIDACIÓN
  if (!username || !email || !password || !poketype) {
    const error = new Error('Todos los campos son obligatorios')
    error.statusCode = 400
    throw error
  }

  // COMPROBAR SI EXISTE EMAIL
  const existe = await User.findOne({ where: { email } })

  if (existe) {
    const error = new Error('Email ya registrado')
    error.statusCode = 409
    throw error
  }

  // HASH PASSWORD
  const hashedPassword = await bcrypt.hash(password, 10)

  // CREAR USUARIO
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    poketype
  })

  // ELIMINAR PASSWORD DE RESPUESTA
  const { password: _, ...userSafe } = user.toJSON()

  return userSafe
}


// 🔑 LOGIN
const login = async ({ email, password }) => {

  if (!email || !password) {
    const error = new Error('Email y password obligatorios')
    error.statusCode = 400
    throw error
  }

  // BUSCAR USUARIO
  const user = await User.findOne({ where: { email } })

  if (!user) {
    const error = new Error('Credenciales incorrectas')
    error.statusCode = 401
    throw error
  }

  // COMPARAR PASSWORD
  const valid = await bcrypt.compare(password, user.password)

  if (!valid) {
    const error = new Error('Credenciales incorrectas')
    error.statusCode = 401
    throw error
  }

  // GENERAR TOKEN
  const token = jwt.sign(
    { 
      id: user.id_user,   // 👈 MUY IMPORTANTE (tu PK real)
      email: user.email 
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )

  return { token }
}

export default { register, login }