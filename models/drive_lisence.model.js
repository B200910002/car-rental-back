const Sequelize = require('sequelize');
const { sequelize } = require('../config/database');

const DriveLicense = sequelize.define('drive_license', {
    license_number: {
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
}, { freezeTableName: true, tableName: 'drive_license' });

module.exports = { DriveLicense };