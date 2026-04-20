import User from '../models/userModel.js'
import bcrypt from 'bcrypt'

// GET ALL
export const getUsers = async () => {
  return await User.findAll({
    attributes: { exclude: ['password'] }
  })
}

// GET BY ID
export const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] }
  })

  if (!user) {
    const error = new Error('Usuario no encontrado')
    error.statusCode = 404
    throw error
  }

  return user
}

// CREATE
export const createUser = async ({ username, password, email, poketype }) => {
  
  if (!username || !password || !email.includes('@') || !poketype) {
    const error = new Error('Faltan campos obligatorios')
    error.statusCode = 400
    throw error
  }

  const existingUser = await User.findOne({ where: { email } })

  if (existingUser) {
    const error = new Error('El email ya está registrado')
    error.statusCode = 400
    throw error
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await User.create({
    username,
    password: hashedPassword,
    email,
    poketype
  })

  const userSafe = newUser.toJSON()
  delete userSafe.password

  return userSafe
}

// UPDATE
export const updateUser = async (id, data) => {
  const user = await User.findByPk(id)

  if (!user) {
    const error = new Error('Usuario no encontrado')
    error.statusCode = 404
    throw error
  }

  await user.update(data)

  return user
}

// DELETE
export const deleteUser = async (id) => {
  const user = await User.findByPk(id)

  if (!user) {
    const error = new Error('Usuario no encontrado')
    error.statusCode = 404
    throw error
  }

  await user.destroy()

  return { message: 'Usuario eliminado' }
}