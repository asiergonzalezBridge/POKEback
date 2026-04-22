import { Router } from 'express'
import { verifyToken, requireAdmin} from '../middlewares/authMiddleware.js'
import { getProfile } from '../controllers/userController.js'
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js'

const router = Router()

router.use(verifyToken)

// perfil → cualquier usuario
router.get('/perfil', getProfile)

// solo admin
router.get('/', requireAdmin, getUsers)
router.get('/:id', requireAdmin, getUserById)
router.delete('/:id', requireAdmin, deleteUser)

// usuario puede editarse a sí mismo
router.patch('/:id', updateUser)

export default router