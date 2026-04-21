import Pokemon from '../models/pokemon.js'

export const getAllPokemonsService = async () => {
  return await Pokemon.findAll()
}

export const getPokemonByIdService = async (id) => {
  const pokemon = await Pokemon.findByPk(id)

  if (!pokemon) {
    throw new Error('NOT_FOUND')
  }

  return pokemon
}

export const createPokemonService = async ({ nombre, tipo, nivel }) => {
  return await Pokemon.create({
    nombre,
    tipo,
    nivel
  })
}

export const updatePokemonService = async (id, { nombre, tipo, nivel }) => {
  const pokemon = await Pokemon.findByPk(id)

  if (!pokemon) {
    throw new Error('NOT_FOUND')
  }

  await pokemon.update({ nombre, tipo, nivel })

  return pokemon
}

export const deletePokemonService = async (id) => {
  const pokemon = await Pokemon.findByPk(id)

  if (!pokemon) {
    throw new Error('NOT_FOUND')
  }

  await pokemon.destroy()

  return true
}