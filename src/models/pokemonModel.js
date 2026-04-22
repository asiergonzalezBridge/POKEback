import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const Pokemon = sequelize.define('Pokemon', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id' 
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nivel: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
}, {

    tableName: 'pokemons', 
    timestamps: false
})

export default Pokemon