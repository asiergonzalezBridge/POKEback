import { UserStore, Product } from '../models/index.js'

// GET STORE DE UN USUARIO
export const getUserStore = async (userId) => {
  const data = await UserStore.findAll({
    where: { user_id_user: userId },
    include: [{
      model: Product,
      as: 'product'
    }]
  })

  return data
}

// COMPRAR PRODUCTO
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

  const newItem = await UserStore.create({
    user_id_user: userId,
    store_id_product: productId,
    quantity: 1
  })

  return newItem
}

// ELIMINAR PRODUCTO
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