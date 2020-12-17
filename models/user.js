const {DataTypes} = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

module.exports = User