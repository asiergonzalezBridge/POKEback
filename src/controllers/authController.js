import authService from '../services/authService.js'

export const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body)
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}


export const login = async (req, res, next) => {
  try {
    const token = await authService.login(req.body)
    res.json({ token })
  } catch (error) {
    next(error)
  }
}

// LOGIN VISTAS (SESIÓN)
export const loginView = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await authService.loginUser(email, password)

    req.session.user = {
      id: user.id_user,
      email: user.email,
      rol: user.rol
    }

    res.redirect('/dashboard')

  } catch (error) {
    next(error)
  }
}