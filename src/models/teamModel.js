import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Team = sequelize.define("Team", {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    pokemonId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING }
});

// Consultas puras a la base de datos
export const findByUserId = async (userId) => {
    return await Team.findAll({ where: { userId } });
};

export const findOneById = async (id) => {
    return await Team.findByPk(id);
};

export const createEntry = async (data) => {
    return await Team.create(data);
};

export const deleteEntry = async (id) => {
    return await Team.destroy({ where: { id } });
};

export default Team;
