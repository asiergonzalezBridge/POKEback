import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Team = sequelize.define("Team", {
    id_user_pokemon: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: { 
        type: DataTypes.INTEGER, 
        field: 'user_id_user' // NOMBRE EXACTO EN TU TABLA SQL
    },
    pokemonId: { 
        type: DataTypes.INTEGER, 
        field: 'pokemon_id_pokemon' // NOMBRE EXACTO EN TU TABLA SQL
    },
    currentHp: { type: DataTypes.INTEGER, field: 'current_hp' },
    currentAttack: { type: DataTypes.INTEGER, field: 'current_attack' },
    currentSpeed: { type: DataTypes.INTEGER, field: 'current_speed' }
}, {
    tableName: 'user_pokemon', // NOMBRE DE LA TABLA EN POSTGRES
    timestamps: false
});

export default Team;