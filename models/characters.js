const {DataTypes} = require('sequelize');
const db = require('../db');

const Character = db.define('characters', {
    characterName = {
        type: DataTypes.STRING,
        allowNull: false
    },
    tags = {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true
    },
    description = {
        type: DataTypes.STRING(2000),
        allowNull: false
    }
})

module.exports = Character