import UserPokemon from "../models/userPokemonModel.js";

/**
 * Obtiene todos los Pokémon que pertenecen a un usuario.
 * @param {number} id - ID del usuario
 * @returns {Promise<UserPokemon[]>} Lista de Pokémon del usuario con sus stats actuales
 */
export const getUserPokemons = async (id) => {
    return await UserPokemon.findAll({
        where: { user_id_user: id }
    });
};
