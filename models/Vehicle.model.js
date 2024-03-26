const Sequelize = require('sequelize');
const { sequelize } = require('../config/database');

const Vehicle = sequelize.define('vehicle', {
    plate_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    make: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    year: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    vehicle_price: {
        type: Sequelize.DOUBLE,
        allowNull: true,
    },
    price_per_day: {
        type: Sequelize.DOUBLE,
        allowNull: true,
    },
    kilometer_per_Day: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    price_exceed_per_kilometer: {
        type: Sequelize.DOUBLE,
        allowNull: true,
    },
    available: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
    },
}, { freezeTableName: true, tableName: 'vehicle' });

module.exports = { Vehicle };