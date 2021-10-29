const User = require("./user.js");
const Profile = require("./profile.js");
const sequelize = require("../config.js");

User.hasOne(Profile);

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
  //Invoice,
  //Lead,
};
