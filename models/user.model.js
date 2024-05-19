const Sequelize = require('sequelize');
const { sequelize } = require('../config/database');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = sequelize.define('user', {
    first_name: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    signature: {
        type: Sequelize.BLOB,
        allowNull: true,
    },
    profile_image: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'USER',
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, { freezeTableName: true, tableName: 'user' });

module.exports = { User };
