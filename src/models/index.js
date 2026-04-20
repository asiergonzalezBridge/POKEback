import User from './userModel.js'
import UserPokemon from './userPokemonModel.js'

// RELACIONES
User.hasMany(UserPokemon, { 
  foreignKey: 'userId',
  onDelete: 'CASCADE'
})

UserPokemon.belongsTo(User, { 
  foreignKey: 'userId'
})

export { User, UserPokemon }