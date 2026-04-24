import { Router } from 'express'
import { loginView } from '../controllers/authController.js'
import { requireSession } from '../middlewares/sessionMiddleware.js'
import authService from '../services/authService.js'
import UserPokemon from '../models/userPokemonModel.js'
import Pokemon from '../models/pokemonModel.js'
import Team from '../models/teamModel.js'
import TeamPokemon from '../models/teamPokemonModel.js'
import Product from '../models/productsModel.js'


const router = Router()

// FORM LOGIN (hecho)
router.get('/login', (req, res) => {
  res.render('login')
})

// LOGIN SESSION
router.post('/login', loginView)

// REGISTER SESSION
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  try {
    await authService.register(req.body)
    res.redirect('/login')
  } catch (error) {
    res.render('register', { error: error.message })
  }
})

// DASHBOARD protegido
router.get('/dashboard', requireSession, (req, res) => {
  res.render('dashboard', { user: req.session.user })
})

// LOGOUT
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login')
  })
})

// MIS POKEMON
router.get('/pokemon', requireSession, async (req, res) => {
  try {
    const pokemons = await UserPokemon.findAll({
      where: { user_id_user: req.session.user.id },
      include: {
        model: Pokemon
      }
    })
    res.render('pokemon', { user: req.session.user, pokemons })
  } catch (error) {
    res.status(500).send('Error al cargar los pokémon')
  }
})

router.get('/teams', requireSession, async (req, res) => {
  try {
    const teams = await Team.findAll({
      where: { id_user: req.session.user.id },
      include: {
        model: TeamPokemon,
        include: {
          model: UserPokemon,
          include: {
            model: Pokemon
          }
        }
      }
    })
    res.render('teams', { teams })
  } catch (error) {
    res.status(500).send('Error al cargar los equipos')
  }
})

// TIENDA
router.get('/store', requireSession, async (req, res) => {
  try {
    const products = await Product.findAll()
    res.render('store', { products })
  } catch (error) {
    res.status(500).send('Error al cargar la tienda')
  }
})


export default router