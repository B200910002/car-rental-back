const Sequelize = require('sequelize');
const { sequelize } = require('../config/database');

const Location = sequelize.define('location', {
    user_id: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    latitude: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    longitude: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    altitude: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    accuracy: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    bearing: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    speed: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, { freezeTableName: true, tableName: 'location' });

module.exports = { Location };