import Pokemon from "../models/pokemonModel.js";

/**
 * Obtiene todos los Pokémon del catálogo.
 * @returns {Promise<Pokemon[]>} Lista de Pokémon
 */
export const getAllPokemonsService = async () => {
    return await Pokemon.findAll();
};

/**
 * Obtiene un Pokémon del catálogo por su ID.
 * @param {number} id - ID del Pokémon (coincide con el ID de la PokeAPI)
 * @returns {Promise<Pokemon>} Pokémon encontrado
 * @throws {Error} 'NOT_FOUND' si no existe
 */
export const getPokemonByIdService = async (id) => {
    const pokemon = await Pokemon.findByPk(id);
    if (!pokemon) throw new Error('NOT_FOUND');
    return pokemon;
};

/**
 * Añade un nuevo Pokémon al catálogo.
 * @param {Object} data - Datos del Pokémon
 * @param {number} data.id_pokemon - ID del Pokémon
 * @param {string} data.name - Nombre
 * @param {string} data.type - Tipo (fire, water, etc.)
 * @param {string} data.sprite - URL del sprite
 * @param {boolean} data.evolution - Indica si puede evolucionar
 * @returns {Promise<Pokemon>} Pokémon creado
 */
export const createPokemonService = async (data) => {
    return await Pokemon.create(data);
};

/**
 * Actualiza los datos de un Pokémon del catálogo.
 * @param {number} id - ID del Pokémon
 * @param {Object} data - Campos a modificar (parcial)
 * @returns {Promise<Pokemon>} Pokémon actualizado
 * @throws {Error} 'NOT_FOUND' si no existe
 */
export const updatePokemonService = async (id, data) => {
    const pokemon = await Pokemon.findByPk(id);
    if (!pokemon) throw new Error('NOT_FOUND');
    return await pokemon.update(data);
};

/**
 * Elimina un Pokémon del catálogo.
 * @param {number} id - ID del Pokémon
 * @returns {Promise<void>}
 * @throws {Error} 'NOT_FOUND' si no existe
 */
export const deletePokemonService = async (id) => {
    const pokemon = await Pokemon.findByPk(id);
    if (!pokemon) throw new Error('NOT_FOUND');
    return await pokemon.destroy();
};
