
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../models/products');

const getAll = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos', details: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto', details: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { type, name, description, price, stock, expire_time } = req.body;

    if (!type || !name || !price || stock === undefined) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const newProduct = await createProduct({ type, name, description, price, stock, expire_time });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto', details: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, name, description, price, stock, expire_time } = req.body;

    const updatedProduct = await updateProduct(id, {
      type,
      name,
      description,
      price,
      stock,
      expire_time,
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto', details: error.message });
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await deleteProduct(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto', details: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteOne,
};