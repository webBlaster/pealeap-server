const sequelize = require("../config.js");
const { Sequelize, DataTypes } = require("sequelize");

const Invoice = sequelize.define("Invoice", {
  // Model attributes are defined here
  uuid: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  customerNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  discountLevel: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 2,
    },
  },
  paid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Invoice;
