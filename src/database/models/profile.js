const sequelize = require("../config.js");
const { DataTypes } = require("sequelize");

const Profile = sequelize.define("Profile", {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  bankName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  accountName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userUuid: {
    type: DataTypes.UUID,
  },
});

module.exports = Profile;
