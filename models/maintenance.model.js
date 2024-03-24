const Sequelize = require('sequelize');
const { sequelize } = require('../config/database');

const Maintenance = sequelize.define('maintenance', {
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cost: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
}, { freezeTableName: true, tableName: 'maintenance' });

module.exports = { Maintenance };