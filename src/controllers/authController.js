const jwt = require("jsonwebtoken");
const userModel = require("../database/models/index.js").User;

const signInUser = async (req, res) => {
  //check if user exist and create new if not
  const [user, created] = await userModel.findOrCreate({
    where: { email: req.body.email },
  });

  //create an expiring token
  const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({
    message: "Signed In",
    data: {
      token,
      email: user.email,
      uuid: user.uuid,
      subscribed: user.subscribed,
    },
    status: 200,
  });
};

async const subscribeUser = (req, res) => {
const user = await userModel.find({where: {uuid: req.body.uuid}});
if(user){
  user.subscribed = true;
  user.save();
  res.json({
    message: "User Subscribed",
    status: 200
  })
}
}

const logoutUser = (req, res) => {};

module.exports = { signInUser, logoutUser , subscribeUser};
