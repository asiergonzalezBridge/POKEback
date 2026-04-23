import Team from "../models/teamModel.js";
import TeamPokemon from "../models/teamPokemonModel.js";
import UserPokemon from "../models/userPokemonModel.js";
import User from "../models/userModel.js";

export const getAllTeam = async () => {
    return await Team.findAll();
}
export const getFullTeam = async (userId) => {
    return await Team.findAll({
        where: { id_user: userId },
        include: {
            model: TeamPokemon,
            include: {
                model: UserPokemon
            }
        }
    });
};

export const removePokemonFromTeam = async (team_id, slot) => {
    return await TeamPokemon.destroy({
        where: { team_id, slot }
    });
};

export const createTeam = async ({ user_id, name, pokemons }) => {
    
    // 1. Verificar usuario
    const user = await User.findByPk(user_id);
    if (!user) {
        throw new Error("El usuario no existe");
    }

    // 2. Validar máximo 6 pokémon
    if (!pokemons || pokemons.length === 0 || pokemons.length > 6) {
        throw new Error("Un equipo debe tener entre 1 y 6 pokémon");
    }

    // 3. Verificar que los pokémon pertenecen al usuario
    const userPokemons = await UserPokemon.findAll({
        where: {
            id_user_pokemon: pokemons,
            user_id_user: user_id
        }
    });

    if (userPokemons.length !== pokemons.length) {
        throw new Error("Algún Pokémon no pertenece al usuario");
    }

    // 4. Crear equipo
    const team = await Team.create({
        id_user: user_id,
        name
    });

    // 5. Insertar pokémon en el equipo con slot
    const teamPokemonsData = pokemons.map((pokeId, index) => ({
        team_id: team.id_team,
        user_pokemon_id: pokeId,
        slot: index + 1
    }));

    await TeamPokemon.bulkCreate(teamPokemonsData);

    return team;
};