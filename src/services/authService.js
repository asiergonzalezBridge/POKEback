import dotenv from 'dotenv'
dotenv.config()

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'

// REGISTER
export const register = async ({ username, email, password, poketype }) => {

  if (!username || !email || !password || !poketype) {
    const error = new Error('Todos los campos son obligatorios')
    error.statusCode = 400
    throw error
  }

  const existe = await User.findOne({ where: { email } })

  if (existe) {
    const error = new Error('Email ya registrado')
    error.statusCode = 409
    throw error
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    poketype
  })

  const { password: _, ...userSafe } = user.toJSON()

  return userSafe
}

// 🔑 LOGIN BASE (reutilizable)
export const loginUser = async (email, password) => {

  const user = await User.findOne({ where: { email } })

  if (!user) {
    const error = new Error('Credenciales incorrectas')
    error.statusCode = 401
    throw error
  }

  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) {
    const error = new Error('Credenciales incorrectas')
    error.statusCode = 401
    throw error
  }

  return user
}

// 🔐 LOGIN API (JWT)
export const login = async ({ email, password }) => {

  if (!email || !password) {
    const error = new Error('Email y password obligatorios')
    error.statusCode = 400
    throw error
  }

  const user = await loginUser(email, password)

  const token = jwt.sign(
    {
      id: user.id_user,
      email: user.email,
      rol: user.rol
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )

  return token
}
export default { register, login, loginUser }