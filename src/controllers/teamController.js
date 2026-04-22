import * as TeamService from "../services/teamService.js";


export const getAllTeams = async (req, res) => {
    try {
        const teams = await TeamService.getAllTeam();
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTeamsByUser = async (req, res) => {
    try {
        const teams = await TeamService.getFullTeam(req.params.user_id);
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createTeam = async (req, res) => {
    try {
        const { user_id, name, pokemons } = req.body;

        const team = await TeamService.createTeam({
            user_id,
            name,
            pokemons
        });

        res.status(201).json(team);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteTeam = async (req, res) => {
    try {
        await TeamService.deleteTeam(req.params.id);
        res.json({ message: "Equipo eliminado" });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};