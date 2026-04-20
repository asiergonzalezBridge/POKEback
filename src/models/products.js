
const pool = require('../config/productsConfig');

const getAllProducts = async () => {
  try {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE id_product = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error al obtener producto por ID:', error);
    throw error;
  }
};

const createProduct = async ({ type, name, description, price, stock, expire_time }) => {
  try {
    const result = await pool.query(
      `INSERT INTO products (type, name, description, price, stock, expire_time)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [type, name, description, price, stock, expire_time || null]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

const updateProduct = async (id, { type, name, description, price, stock, expire_time }) => {
  try {
    const result = await pool.query(
      `UPDATE products 
       SET type = $1, name = $2, description = $3, price = $4, stock = $5, expire_time = $6
       WHERE id_product = $7
       RETURNING *`,
      [type, name, description, price, stock, expire_time || null, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const result = await pool.query('DELETE FROM products WHERE id_product = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};