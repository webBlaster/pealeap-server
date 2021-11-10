const sequelize = require("../config.js");
const { Sequelize, DataTypes } = require("sequelize");

const Lead = sequelize.define("Lead", {
  // Model attributes are defined here
  uuid: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  invoiceUuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  friendsName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  friendsNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  couponCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  couponUsed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  marked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Lead;
