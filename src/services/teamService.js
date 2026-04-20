import * as TeamModel from "../models/teamModel.js";

// Obtener equipo con lógica 
export const getFullTeam = async (userId) => {
    return await TeamModel.findByUserId(userId);
};

// Añadir regla (máximo 6)
export const addPokemonToTeam = async (data) => {
    const currentTeam = await TeamModel.findByUserId(data.userId);
    
    if (currentTeam.length >= 6) {
        throw new Error("El equipo ya está lleno. No puedes tener más de 6 Pokémon.");
    }

    return await TeamModel.createEntry(data);
};

// Borrar con validación de existencia
export const removePokemon = async (id) => {
    const exists = await TeamModel.findOneById(id);
    if (!exists) {
        throw new Error("El registro que intentas borrar no existe.");
    }
    return await TeamModel.deleteEntry(id);
};
