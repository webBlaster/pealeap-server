const sequelize = require("../config.js");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  // Model attributes are defined here
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subscribed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
