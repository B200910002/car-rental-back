const Sequelize = require('sequelize');
const { sequelize } = require('../config/database');

const Payment = sequelize.define('payment', {
    pay_amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    paid_amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    estimated_amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
}, { freezeTableName: true, tableName: 'payment' });

module.exports = { Payment };