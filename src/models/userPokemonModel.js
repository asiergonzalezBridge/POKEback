import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const UserPokemon = sequelize.define('UserPokemon', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  pokemonName: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
  tableName: 'user_pokemon',
  timestamps: false
})

export default UserPokemon