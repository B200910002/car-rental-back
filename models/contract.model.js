const Sequelize = require('sequelize');
const { sequelize } = require('../config/database');

const Contract = sequelize.define('contract', {
    sign_date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    terms: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    owner_signature: {
        type: Sequelize.BLOB,
        allowNull: false,
    },
    renter_signature: {
        type: Sequelize.BLOB,
        allowNull: false,
    },
}, { freezeTableName: true, tableName: 'contract' });

module.exports = { Contract };