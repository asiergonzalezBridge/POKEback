import { User } from '../models/index.js'
import Product from '../models/productsModel.js'

/**
 * Renderiza el panel de administración con todos los usuarios y productos.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getAdminPanel = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['id_user', 'ASC']]
    })

    const products = await Product.findAll({
      order: [['id_product', 'ASC']]
    })

    res.render('admin', { users, products, user: req.session.user })
  } catch (error) {
    res.status(500).send('Error al cargar el panel de administración')
  }
}

/**
 * Edita el tipo y las monedas de un usuario desde el panel admin.
 */
export const editUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (user) await user.update({
      poketype: req.body.poketype,
      coins: parseInt(req.body.coins)
    })
    res.redirect('/admin')
  } catch (error) {
    res.status(500).send('Error al editar el usuario')
  }
}

/**
 * Elimina un usuario por su ID.
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (user) await user.destroy()
    res.redirect('/admin')
  } catch (error) {
    res.status(500).send('Error al eliminar el usuario')
  }
}

/**
 * Crea un nuevo producto desde el panel admin.
 */
export const createProduct = async (req, res) => {
  try {
    const { type, name, description, price, stock, expire_time } = req.body
    await Product.create({ type, name, description, price, stock, expire_time: expire_time || null })
    res.redirect('/admin')
  } catch (error) {
    res.status(500).send('Error al crear el producto')
  }
}

/**
 * Edita un producto existente desde el panel admin.
 */
export const editProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (product) await product.update(req.body)
    res.redirect('/admin')
  } catch (error) {
    res.status(500).send('Error al editar el producto')
  }
}

/**
 * Elimina un producto por su ID.
 */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (product) await product.destroy()
    res.redirect('/admin')
  } catch (error) {
    res.status(500).send('Error al eliminar el producto')
  }
}