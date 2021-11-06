const sequelize = require("../config.js");
const { Sequelize, DataTypes } = require("sequelize");

const Lead = sequelize.define("Lead", {
  // Model attributes are defined here
  uuid: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  friendName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Lead;
