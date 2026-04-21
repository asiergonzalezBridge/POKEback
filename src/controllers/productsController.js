
import * as productService from '../services/productService.js'

// GET ALL
export const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getProducts()
    res.json(products)
  } catch (error) {
    next(error)
  }
}

// GET BY ID
export const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id)
    res.json(product)
  } catch (error) {
    next(error)
  }
}

// CREATE
export const createProduct = async (req, res, next) => {
  try {
    const { type, name, description, price, stock, expire_time } = req.body

    if (!type || !name || !price || stock === undefined) {
      return res.status(400).json({ error: 'Faltan campos requeridos' })
    }

    const newProduct = await productService.createProduct({
      type,
      name,
      description,
      price,
      stock,
      expire_time,
    })

    res.status(201).json(newProduct)
  } catch (error) {
    next(error)
  }
}

// UPDATE
export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await productService.updateProduct(
      req.params.id,
      req.body
    )

    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
}

// DELETE
export const deleteProduct = async (req, res, next) => {
  try {
    const result = await productService.deleteProduct(req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}