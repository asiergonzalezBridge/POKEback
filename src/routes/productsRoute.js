
const express = require('express');
const router = express.Router();
const {
  getAll,
  getById,
  create,
  update,
  deleteOne,
} = require('../controllers/productsController');

router.get('/', getAll);                 // GET /api/products
router.get('/:id', getById);             // GET /api/products/1
router.post('/', create);                // POST /api/products
router.put('/:id', update);              // PUT /api/products/1
router.delete('/:id', deleteOne);        // DELETE /api/products/1

module.exports = router;