const User = require("./user.js");
const Profile = require("./profile.js");
const Invoice = require("./invoice.js");
const Lead = require("./lead.js");
const sequelize = require("../config.js");

User.hasOne(Profile);
User.hasMany(Invoice);
User.hasMany(Lead);

sequelize
  .sync()
  .then((result) => {
    console.log("synced");
  })
  .catch((error) => {
    console.log(error);
  });
module.exports = {
  User,
  Profile,
  Invoice,
  Lead,
};
