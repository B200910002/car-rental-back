const Sequelize = require('sequelize');
const { sequelize } = require('../config/database');
const { User } = require('./user.model');

const Booking = sequelize.define('booking', {
    start_at: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    end_at: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'PENDING',
    },
}, { freezeTableName: true, tableName: 'booking' });

module.exports = { Booking };