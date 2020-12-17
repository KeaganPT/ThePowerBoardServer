const User = require('./user');
const Power = require('./power');
const Character = require('./characters')

Power.belongsTo(User);

Character.belongsTo(User);

User.hasMany(Power);
User.hasMany(Character);

module.exports = {User, Power, Character}