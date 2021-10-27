const User = require("./user.js");
const sequelize = require("../config.js");

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
  //Invoice,
  //Lead,
};
