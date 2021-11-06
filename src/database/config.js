const Sequelize = require("sequelize");
const connectionString = process.env.DATABASE_URL;
const sequelize = new Sequelize(connectionString, {
  dialectOptions: { ssl: true },
});

module.exports = sequelize;
