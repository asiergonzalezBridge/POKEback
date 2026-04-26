import { UserStore, Product } from '../models/index.js'

/**
 * Obtiene todos los productos comprados por un usuario.
 * @param {number} userId - ID del usuario
 * @returns {Promise<UserStore[]>} Entradas del inventario con los datos del producto incluidos
 */
export const getUserStore = async (userId) => {
  return await UserStore.findAll({
    where: { user_id_user: userId },
    include: [{ model: Product, as: 'product' }]
  })
}

/**
 * Compra un producto para un usuario.
 * Si ya lo tiene, incrementa la cantidad en 1. Si no, crea el registro.
 * @param {number} userId - ID del usuario comprador
 * @param {number} productId - ID del producto a comprar
 * @returns {Promise<UserStore>} Registro actualizado o creado
 */
export const buyProduct = async (userId, productId) => {

  const existing = await UserStore.findOne({
    where: {
      user_id_user: userId,
      store_id_product: productId
    }
  })

  if (existing) {
    existing.quantity += 1
    await existing.save()
    return existing
  }

  return await UserStore.create({
    user_id_user: userId,
    store_id_product: productId,
    quantity: 1
  })
}

/**
 * Elimina un producto del inventario de un usuario.
 * @param {number} userId - ID del usuario
 * @param {number} productId - ID del producto a eliminar
 * @returns {Promise<{message: string}>} Mensaje de confirmación
 * @throws {Error} 404 si el producto no está en el inventario del usuario
 */
export const removeProduct = async (userId, productId) => {
  const item = await UserStore.findOne({
    where: {
      user_id_user: userId,
      store_id_product: productId
    }
  })

  if (!item) {
    const error = new Error('Producto no encontrado en la tienda del usuario')
    error.statusCode = 404
    throw error
  }

  await item.destroy()

  return { message: 'Producto eliminado' }
}
