const signInUser = (req, res) => {
  //verify token with google servers
  //get user info from google servers
  //check if user exist and create new if not
  //create an expiring token
  res.json("Signed In");
};

const logoutUser = (req, res) => {};

module.exports = { signInUser, logoutUser };
