import Pokemon from "../models/pokemonModel.js"; // O como se llame tu modelo de pokemon

export const getAllPokemonsService = async () => {
    return await Pokemon.findAll();
};

export const getPokemonByIdService = async (id) => {
    const pokemon = await Pokemon.findByPk(id);
    if (!pokemon) throw new Error('NOT_FOUND');
    return pokemon;
};

export const createPokemonService = async (data) => {
    return await Pokemon.create(data);
};

export const updatePokemonService = async (id, data) => {
    const pokemon = await Pokemon.findByPk(id);
    if (!pokemon) throw new Error('NOT_FOUND');
    return await pokemon.update(data);
};

export const deletePokemonService = async (id) => {
    const pokemon = await Pokemon.findByPk(id);
    if (!pokemon) throw new Error('NOT_FOUND');
    return await pokemon.destroy();
};