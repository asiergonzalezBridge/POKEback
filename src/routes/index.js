import { Router } from 'express';
import userRoutes from './userRoutes.js';
import teamRouter from './teamRouter.js';
import pokemonRoutes from './pokemonRoutes.js';
import productRoutes from './productsRoute.js';

const router = Router();

// Agrupamos todas las rutas bajo sus respectivos prefijos
router.use('/users', userRoutes);      // Responderá en /api/users
router.use('/team', teamRouter);        // Responderá en /api/team
router.use('/pokemon', pokemonRoutes);  // Responderá en /api/pokemon
router.use('/products', productRoutes); // Responderá en /api/products

export default router;