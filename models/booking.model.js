const Sequelize = require('sequelize');
const { sequelize } = require('../config/database');

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
    },
}, { freezeTableName: true, tableName: 'booking' });

module.exports = { Booking };