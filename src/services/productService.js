
import Product from '../models/productsModel.js'

// ID VALIDATION
const validateId = (id) => {
  if (!id || isNaN(id)) {
    const error = new Error('ID inválido')
    error.statusCode = 400
    throw error
  }
}

// GET ALL
export const getAllProducts = async () => {
  return await Product.findAll()
}

// GET BY ID
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

// CREATE
export const createProduct = async (data) => {
  const {type, name, description, price, stock, expire_time} = data

  if (!type || !name || price === undefined || stock === undefined) {
    const error = new Error('Faltan campos obligatorios')
    error.statusCode = 400
    throw error
  }

  return await Product.create({type, name, description, price, stock, expire_time})
}

// UPDATE
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

// DELETE
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