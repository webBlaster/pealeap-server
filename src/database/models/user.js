const sequelize = require("../config.js");
const { Sequelize, DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  // Model attributes are defined here
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  subscribed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
