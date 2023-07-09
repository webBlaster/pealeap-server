const Sequelize = require("sequelize");
const connectionString = process.env.DATABASE_URL || "";
const sequelize = new Sequelize(connectionString, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
