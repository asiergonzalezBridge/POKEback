import Team from "../models/teamModel.js";

export const getFullTeam = async (userId) => {
    return await Team.findAll({ where: { userId } });
};

export const addPokemonToTeam = async (data) => {
    // Validación de seguridad: Si no hay userId en el body, frenamos aquí
    if (!data.userId) {
        throw new Error("ID_REQUIRED");
    }

    const currentTeam = await Team.findAll({ where: { userId: data.userId } });
    
    if (currentTeam.length >= 6) {
        throw new Error("TEAM_FULL");
    }
    
    return await Team.create(data);
};

export const removePokemon = async (id) => {
    return await Team.destroy({ where: { id_user_pokemon: id } });
};