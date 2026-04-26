import { User, UserStore } from '../models/index.js'
import Product from '../models/productsModel.js'

/**
 * Obtiene todos los usuarios excluyendo el campo password.
 * @returns {Promise<User[]>} Lista de usuarios ordenada por ID
 */
export const getAllUsers = async () => {
  return await User.findAll({
    attributes: { exclude: ['password'] },
    order: [['id_user', 'ASC']]
  })
}

/**
 * Elimina un usuario por su ID.
 * @param {number} id - ID del usuario a eliminar
 * @throws {Error} 404 si el usuario no existe
 */
export const deleteUser = async (id) => {
  const user = await User.findByPk(id)

  if (!user) {
    const error = new Error('Usuario no encontrado')
    error.statusCode = 404
    throw error
  }

  await user.destroy()
}

/**
 * Edita el poketype y las monedas de un usuario.
 * @param {number} id - ID del usuario
 * @param {Object} data - Campos a modificar
 * @param {string} data.poketype - Nuevo tipo de Pokémon
 * @param {number} data.coins - Nueva cantidad de monedas
 * @throws {Error} 404 si el usuario no existe
 */
export const editUser = async (id, data) => {
  const user = await User.findByPk(id)

  if (!user) {
    const error = new Error('Usuario no encontrado')
    error.statusCode = 404
    throw error
  }

  await user.update({
    poketype: data.poketype,
    coins: parseInt(data.coins)
  })
}

/**
 * Obtiene todos los productos ordenados por ID.
 * @returns {Promise<Product[]>} Lista de productos
 */
export const getAllProducts = async () => {
  return await Product.findAll({
    order: [['id_product', 'ASC']]
  })
}

/**
 * Crea un nuevo producto.
 * @param {Object} data - Datos del producto
 * @param {string} data.type - Tipo: 'cosmetic', 'pokemon' o 'upgrade'
 * @param {string} data.name - Nombre del producto
 * @param {string} [data.description] - Descripción opcional
 * @param {number} data.price - Precio en monedas
 * @param {number} data.stock - Unidades disponibles
 * @param {Date} [data.expire_time] - Fecha de expiración opcional
 * @throws {Error} 400 si faltan campos obligatorios
 */
export const createProduct = async (data) => {
  const { type, name, description, price, stock, expire_time } = data

  if (!type || !name || price === undefined || stock === undefined) {
    const error = new Error('Faltan campos obligatorios')
    error.statusCode = 400
    throw error
  }

  await Product.create({
    type, name, description, price, stock,
    expire_time: expire_time || null
  })
}

/**
 * Edita un producto existente.
 * @param {number} id - ID del producto
 * @param {Object} data - Campos a modificar (parcial)
 * @throws {Error} 404 si el producto no existe
 */
export const editProduct = async (id, data) => {
  const product = await Product.findByPk(id)

  if (!product) {
    const error = new Error('Producto no encontrado')
    error.statusCode = 404
    throw error
  }

  await product.update(data)
}

/**
 * Elimina un producto por su ID.
 * @param {number} id - ID del producto a eliminar
 * @throws {Error} 404 si el producto no existe
 */
export const deleteProduct = async (id) => {
  const product = await Product.findByPk(id)

  if (!product) {
    const error = new Error('Producto no encontrado')
    error.statusCode = 404
    throw error
  }

  await product.destroy()
}

/**
 * Obtiene todas las compras de todos los usuarios.
 * @returns {Promise<UserStore[]>} Lista de compras con usuario y producto incluidos
 */
export const getAllPurchases = async () => {
  return await UserStore.findAll({
    include: [
      { model: Product, as: 'product' },
      { model: User, attributes: ['username'] }
    ],
    order: [['user_id_user', 'ASC']]
  })
}