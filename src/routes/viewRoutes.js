import { Router } from 'express'
import { loginView } from '../controllers/authController.js'
import { requireSession } from '../middlewares/sessionMiddleware.js'
const router = Router()

// FORM LOGIN (para Pug luego)
router.get('/login', (req, res) => {
  res.send('Formulario login') // temporal
})

// LOGIN SESSION
router.post('/login', loginView)

// DASHBOARD protegido
router.get('/dashboard', requireSession, (req, res) => {
  res.send(`Bienvenido ${req.session.user.email}`)
})

// LOGOUT
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login')
  })
})

export default router