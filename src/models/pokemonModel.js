import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const Pokemon = sequelize.define('Pokemon', {
    // Si tu base de datos usa "id_pokemon", cambia "id" por "id_pokemon" abajo
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id' // Esto fuerza a Sequelize a buscar la columna exacta "id"
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
    // PRUEBA ESTO: Si el error persiste, cambia 'pokemons' por 'pokemon'
    tableName: 'pokemons', 
    timestamps: false
})

export default Pokemon