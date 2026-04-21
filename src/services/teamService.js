import * as teamModel from "../models/teamModel.js";

export const getFullTeam = async (userId) => {
    return await teamModel.findByUserId(userId);
};

export const addPokemonToTeam = async (data) => {
    const currentTeam = await teamModel.findByUserId(data.userId);
    if (currentTeam.length >= 6) {
        throw new Error("El equipo ya está lleno (máximo 6)");
    }
    return await teamModel.createEntry(data);
};

export const removePokemon = async (id) => {
    return await teamModel.deleteEntry(id);
};