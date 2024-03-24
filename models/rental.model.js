const Sequelize = require('sequelize');
const { sequelize } = require('../config/database');

const Rental = sequelize.define('rental', {
    rental_rate: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    insurance_charge: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    fuel_charge: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, { freezeTableName: true, tableName: 'rental' });

module.exports = { Rental };