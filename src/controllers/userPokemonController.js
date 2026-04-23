import UserPokemon from "../models/userPokemonModel.js";

export const getUserPokemons = async (req, res) => {
    try {
        const pokemons = await UserPokemon.findAll({
            where: { user_id_user: req.params.user_id }
        });

        res.json(pokemons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};