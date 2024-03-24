const Sequelize = require('sequelize');
const { sequelize } = require('../config/database');

const CitizenIdentify = sequelize.define('citizen_identify', {
    registration_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    front_side: {
        type: Sequelize.BLOB,
        allowNull: false,
    },
    back_side: {
        type: Sequelize.BLOB,
        allowNull: false,
    },
    iss: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    exp: {
        type: Sequelize.DATE,
        allowNull: false,
    },
}, { freezeTableName: true, tableName: 'citizen_identify' });

module.exports = { CitizenIdentify };