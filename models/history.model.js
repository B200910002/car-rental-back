const Sequelize = require('sequelize');
const { sequelize } = require('../config/database');

const History = sequelize.define('history', {
    test: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, { freezeTableName: true, tableName: 'history' });

module.exports = { History };