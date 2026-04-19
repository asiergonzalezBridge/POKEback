import { teamFunctions } from "../../models/teamModel.js";

// Obtener el equipo de un usuario
async function getTeam(req, res) {
    try {
        const { userId } = req.params;
        const team = await teamFunctions.getTeamByUser(userId);
        res.json(team);
        
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el equipo del usuario." });
    }
}

// Añadir un Pokémon al equipo
async function postPokemon(req, res) {
    try {
        const pokemonData = req.body;
        const newPokemon = await teamFunctions.addPokemon(pokemonData);
        res.status(201).json(newPokemon);
        
    } catch (error) {
        res.status(400).json({ error: "No se pudo añadir el Pokémon. Revisa los datos." });
    }
}

// Borrar un Pokémon
async function deletePokemon(req, res) {
    try {
        const { id } = req.params;
        await teamFunctions.removePokemon(id);
        res.json({ message: "Pokémon borrado correctamente." });
        
    } catch (error) {
        res.status(500).json({ error: "Error al intentar eliminar el Pokémon." });
    }
}

// / Exportar modelo y funciones para el Router 
export default {
    getTeam,
    postPokemon,
    deletePokemon
};
