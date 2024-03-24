const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_URL);

const connectDB = async () => {
  sequelize
    .sync()
    .then(() => {
      console.log("Database synchronized");
    })
    .catch((e) => {
      console.log(e.message);
    });
};

module.exports = { sequelize, connectDB };
