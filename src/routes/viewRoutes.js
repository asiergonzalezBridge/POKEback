import { Router } from 'express'
import { loginView } from '../controllers/authController.js'
import { requireSession } from '../middlewares/sessionMiddleware.js'
const router = Router()

// FORM LOGIN (
router.get('/login', (req, res) => {
  res.render('login')
})

// LOGIN SESSION
router.post('/login', loginView)

// DASHBOARD protegido
import Team from '../models/teamModel.js'

router.get('/dashboard', requireSession, async (req, res) => {

  const teams = await Team.findAll({
    where: { id_user: req.session.user.id }
  })

  res.render('dashboard', {
    user: req.session.user,
    teams
  })
})

// LOGOUT
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login')
  })
})

export default router