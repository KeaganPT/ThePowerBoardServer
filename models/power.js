const {DataTypes} = require('sequelize');
const db = require('../db');

const Power = db.define('powers', {
    powerName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Power;