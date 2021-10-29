const 
const profileModel = require("../database/models/index.js").Profile;

const updateProfile = async (req, res) => {
  //check if profile exist if so update it else create new
  const [profile, created] = await profileModel.findOrCreate({
    where: { userUuid: req.body.uuid },
  });

  res.json({
    message: "Profile Updated",
  });
};

const updateImage = async (req, res) => {
  //optimize and store in cloudinary
  const profile = await profileModel.find({
    where: { userUuid: req.body.uuid },
  });

  res.json({
    message: "Profile Updated",
  });
};

function verifyAccountDetails() {}

module.exports = { updateProfile, updateImage };
