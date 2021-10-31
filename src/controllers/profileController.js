const fetch = require("node-fetch");
const constants = require("../constants.js");
const profileModel = require("../database/models/index.js").Profile;

const updateProfile = async (req, res) => {
  //check if profile exist if so update it else create new
  // const [profile, created] = await profileModel.findOrCreate({
  //   where: { userUuid: req.body.uuid },
  // });
  verifyAccountDetails("0734641395", "044");
  res.json({
    message: "Profile Updated",
  });
};

const updateImage = async (req, res) => {
  //optimize and store in cloudinary
  // const profile = await profileModel.find({
  //   where: { userUuid: req.body.uuid },
  // });

  res.json({
    message: "Profile Updated",
  });
};

async function verifyAccountDetails(accountNumber, bankCode) {
  const { PAYSTACK_API } = constants;
  await fetch(
    `${PAYSTACK_API}/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  )
    .then(async (response) => {
      const result = await response.json();
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = { updateProfile, updateImage };
