import Product from '../models/productsModel.js'

/**
 * Valida que un ID sea un número válido.
 * @param {*} id - Valor a validar
 * @throws {Error} 400 si el ID es nulo o no numérico
 */
const validateId = (id) => {
  if (!id || isNaN(id)) {
    const error = new Error('ID inválido')
    error.statusCode = 400
    throw error
  }
}

/**
 * Obtiene todos los productos de la base de datos.
 * @returns {Promise<Product[]>} Lista de productos
 */
export const getAllProducts = async () => {
  return await Product.findAll()
}

/**
 * Obtiene un producto por su ID.
 * @param {number} id - ID del producto
 * @returns {Promise<Product>} Producto encontrado
 * @throws {Error} 400 si el ID es inválido | 404 si no existe
 */
export const getProductById = async (id) => {
  validateId(id)

  const product = await Product.findByPk(id)

  if (!product) {
    const error = new Error('Producto no encontrado')
    error.statusCode = 404
    throw error
  }

  return product
}

/**
 * Crea un nuevo producto.
 * @param {Object} data - Datos del producto
 * @param {string} data.type - Tipo: 'cosmetic', 'pokemon' o 'upgrade'
 * @param {string} data.name - Nombre del producto
 * @param {string} [data.description] - Descripción opcional
 * @param {number} data.price - Precio en monedas
 * @param {number} data.stock - Unidades disponibles
 * @param {Date} [data.expire_time] - Fecha de expiración (productos temporales)
 * @returns {Promise<Product>} Producto creado
 * @throws {Error} 400 si faltan campos obligatorios
 */
export const createProduct = async (data) => {
  const { type, name, description, price, stock, expire_time } = data

  if (!type || !name || price === undefined || stock === undefined) {
    const error = new Error('Faltan campos obligatorios')
    error.statusCode = 400
    throw error
  }

  return await Product.create({ type, name, description, price, stock, expire_time })
}

/**
 * Actualiza los datos de un producto existente.
 * @param {number} id - ID del producto a actualizar
 * @param {Object} data - Campos a modificar (parcial)
 * @returns {Promise<Product>} Producto actualizado
 * @throws {Error} 400 si el ID es inválido o no hay datos | 404 si no existe
 */
export const updateProduct = async (id, data) => {
  validateId(id)

  const product = await Product.findByPk(id)

  if (!product) {
    const error = new Error('Producto no encontrado')
    error.statusCode = 404
    throw error
  }

  if (!data || Object.keys(data).length === 0) {
    const error = new Error('No hay datos para actualizar')
    error.statusCode = 400
    throw error
  }

  await product.update(data)

  return product
}

/**
 * Elimina un producto de la base de datos.
 * @param {number} id - ID del producto a eliminar
 * @returns {Promise<{message: string}>} Mensaje de confirmación
 * @throws {Error} 400 si el ID es inválido | 404 si no existe
 */
export const deleteProduct = async (id) => {
  validateId(id)

  const product = await Product.findByPk(id)

  if (!product) {
    const error = new Error('Producto no encontrado')
    error.statusCode = 404
    throw error
  }

  await product.destroy()

  return { message: 'Producto eliminado' }
}
