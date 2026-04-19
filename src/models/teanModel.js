import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

/** descriptores de tabla*/
const TeamModel = sequelize.define("Team", {
    id_user_pokemon: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pokemon_id_pokemon: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    current_hp: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    current_attack: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    current_speed: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'user_pokemon',
    timestamps: false
});

/** Busca  los pokémon de un usuario*/
async function getTeamByUser(userId) {
    return await TeamModel.findAll({
        where: { user_id_user: userId }
    });
}

/** Crear */
async function addPokemon(pokemonData) {
    // pokemonData debe contener: user_id_user, pokemon_id_pokemon, stats
    return await TeamModel.create(pokemonData);
}

/** Elimina  pokémon por id.*/
async function removePokemon(idUserPokemon) {
    return await TeamModel.destroy({
        where: { id_user_pokemon: idUserPokemon }
    });
}

// Exportar modelo y funciones para el controlador
export const teamFunctions = {
    getTeamByUser,
    addPokemon,
    removePokemon
};

export default TeamModel;
