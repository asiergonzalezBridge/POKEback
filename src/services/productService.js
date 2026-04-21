
import Product from '../models/productsModel.js'

// GET ALL
export const getAllProducts = async () => {
  return await Product.findAll()
}

// GET BY ID
export const getProductById = async (id) => {
  if (!id || isNaN(id)) {
    const error = new Error('ID incorrecto')
    error.statusCode = 400
    throw error
  }

  const product = await Product.findByPk(id)

  if (!product) {
    const error = new Error('Producto no encontrado')
    error.statusCode = 404
    throw error
  }

  return product
}

// CREATE
export const createProduct = async ({
  type,
  name,
  description,
  price,
  stock,
  expire_time
}) => {
  if (
    !type ||
    !name ||
    !price === undefined ||
    stock === undefined
  ) {
    const error = new Error('Faltan campos obligatorios')
    error.statusCode = 400
    throw error
  }

  const newProduct = await Product.create({
    type,
    name,
    description,
    price,
    stock,
    expire_time
  })

  return newProduct
}

// UPDATE
export const updateProduct = async (id, data) => {
  if (!id || isNaN(id)) {
    const error = new Error('ID inválido')
    error.statusCode = 400
    throw error
  }

  const product = await Product.findByPk(id)

  if (!product) {
    const error = new Error('Producto no encontrado')
    error.statusCode = 404
    throw error
  }

  await product.update(data)

  return product
}

// DELETE
export const deleteProduct = async (id) => {

  if (!id || isNaN(id)) {
    const error = new Error('ID inválido')
    error.statusCode = 400
    throw error
  }

  const product = await Product.findByPk(id)

  if (!product) {
    const error = new Error('Producto no encontrado')
    error.statusCode = 404
    throw error
  }

  await product.destroy()

  return { message: 'Producto eliminado' }
}