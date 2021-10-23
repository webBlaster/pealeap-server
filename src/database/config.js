const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "postgres://postgres:int_main1@localhost:5432/pealeap"
);

module.exports = sequelize;
