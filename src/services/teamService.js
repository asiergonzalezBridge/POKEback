import Team from "../models/teamModel.js";
import TeamPokemon from "../models/teamPokemonModel.js";
import UserPokemon from "../models/userPokemonModel.js";
import User from "../models/userModel.js";

/**
 * Obtiene todos los equipos de la base de datos.
 * @returns {Promise<Team[]>} Lista de equipos
 */
export const getAllTeam = async () => {
    return await Team.findAll();
};

/**
 * Obtiene los equipos completos de un usuario, incluyendo los Pokémon de cada slot.
 * @param {number} id - ID del usuario
 * @returns {Promise<Team[]>} Equipos con sus TeamPokemons y UserPokemons anidados
 */
export const getFullTeam = async (id) => {
    return await Team.findAll({
        where: { id_user: id },
        include: {
            model: TeamPokemon,
            include: {
                model: UserPokemon
            }
        }
    });
};

/**
 * Elimina un Pokémon de un slot concreto de un equipo.
 * @param {number} team_id - ID del equipo
 * @param {number} slot - Número de slot (1-6)
 * @returns {Promise<number>} Número de registros eliminados
 */
export const removePokemonFromTeam = async (team_id, slot) => {
    return await TeamPokemon.destroy({
        where: { team_id, slot }
    });
};

/**
 * Crea un equipo con sus Pokémon asignados por slot.
 * Valida que el usuario exista, que los Pokémon sean suyos y que no superen 6.
 * @param {Object} data - Datos del equipo
 * @param {number} data.user_id - ID del usuario propietario
 * @param {string} data.name - Nombre del equipo
 * @param {number[]} data.pokemons - Array de IDs de user_pokemon (1-6 elementos)
 * @returns {Promise<Team>} Equipo creado
 * @throws {Error} Si el usuario no existe, los Pokémon no le pertenecen o hay más de 6
 */
export const createTeam = async ({ user_id, name, pokemons }) => {

    const user = await User.findByPk(user_id);
    if (!user) throw new Error("El usuario no existe");

    if (!pokemons || pokemons.length === 0 || pokemons.length > 6) {
        throw new Error("Un equipo debe tener entre 1 y 6 pokémon");
    }

    // Verifica que todos los Pokémon pertenezcan al usuario
    const userPokemons = await UserPokemon.findAll({
        where: {
            id_user_pokemon: pokemons,
            user_id_user: user_id
        }
    });

    if (userPokemons.length !== pokemons.length) {
        throw new Error("Algún Pokémon no pertenece al usuario");
    }

    const team = await Team.create({ id_user: user_id, name });

    const teamPokemonsData = pokemons.map((pokeId, index) => ({
        team_id: team.id_team,
        user_pokemon_id: pokeId,
        slot: index + 1
    }));

    await TeamPokemon.bulkCreate(teamPokemonsData);

    return team;
};
