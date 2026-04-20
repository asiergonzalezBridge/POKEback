import * as teamModel from "../models/teamModel.js"; // Usamos minúscula para ser consistentes

export const getFullTeam = async (userId) => {
    return await teamModel.findByUserId(userId); // teamModel con t minúscula
};

export const addPokemonToTeam = async (data) => {
    const currentTeam = await teamModel.findByUserId(data.userId);
    if (currentTeam.length >= 6) {
        throw new Error("El equipo ya esta lleno");
    }
    return await teamModel.createEntry(data);
};

export const removePokemon = async (id) => {
    const exists = await teamModel.findOneById(id);
    if (!exists) {
        throw new Error("El registro no existe");
    }
    return await teamModel.deleteEntry(id);
};