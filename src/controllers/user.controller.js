import User from '../models/user.model.js'

// GET ALL USERS
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] } //no devolver password
    })
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' })
  }
}

// GET USER BY ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    })

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' })
  }
}

// CREATE USER
import bcrypt from 'bcrypt'

export const createUser = async (req, res) => {
  try {
    const { username, password, email, poketype } = req.body

    // VALIDACIÓN BÁSICA
    if (!username || !password || !email || !poketype) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' })
    }

    // EVITAR EMAIL DUPLICADO
    const existingUser = await User.findOne({ where: { email } })

    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' })
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      poketype
    })

    // NO DEVOLVER PASSWORD
    const userSafe = newUser.toJSON()
    delete userSafe.password

    res.status(201).json(userSafe)

  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' })
  }
}

// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    await user.update(req.body)

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' })
  }
}

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    await user.destroy()

    res.json({ message: 'Usuario eliminado' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' })
  }
}