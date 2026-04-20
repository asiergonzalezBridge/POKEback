// src/controllers/teamController.js

import * as TeamService from "../services/teamService.js"; // CORREGIDO: un solo "../"

export const getTeam = async (req, res) => {
    try {
        const team = await TeamService.getFullTeam(req.params.userId);
        res.json(team);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createTeamMember = async (req, res) => {
    try {
        const newMember = await TeamService.addPokemonToTeam(req.body);
        res.status(201).json(newMember);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteTeamMember = async (req, res) => {
    try {
        await TeamService.removePokemon(req.params.id);
        res.json({ message: "Pokémon eliminado del equipo correctamente." });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};