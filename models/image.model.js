const Sequelize = require('sequelize');
const { sequelize } = require('../config/database');

const Image = sequelize.define('image', {
    image_url: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, { freezeTableName: true, tableName: 'image' });

module.exports = { Image };