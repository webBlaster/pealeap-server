const fetch = require("node-fetch");
const constants = require("../constants.js");
const cloudinary = require("../config.js");
const profileModel = require("../database/models/index.js").Profile;

const updateImage = async (req, res) => {
  optimizeAndStoreImage(req.file.path, req, res);
};

const updateProfile = async (req, res) => {
  //check if profile exist if so update it else create new
  const [profile, created] = await profileModel.findOrCreate({
    where: { userUuid: req.body.uuid },
  });
  await verifyAccountDetails(accountNumber, bankCode);
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

//update image on cloudinary and database
async function optimizeAndStoreImage(image, req, res) {
  cloudinary.uploader.upload(
    image,
    { quality: "auto" },
    async (error, result) => {
      if (result) {
        const [profile, created] = await profileModel.findOrCreate({
          where: { UserUuid: req.body.userId },
          defaults: {
            publicId: result.public_id,
            imageUrl: result.secure_url,
            UserUuid: req.body.userId,
          },
        });
        if (created) {
          res.json({
            status: 200,
            message: "Picture Created",
          });
          return;
        }
        deleteImage(profile.publicId);

        profile.publicId = result.public_id;
        profile.imageUrl = result.secure_url;
        profile.save();
        res.json({
          status: 200,
          message: "Picture Updated",
        });
        return;
      }
      console.log(error);
      res.json({
        status: 500,
        message: "Picture failed to update",
      });
    }
  );
}

async function deleteImage(imageId) {
  cloudinary.uploader.destroy(imageId, (response) => {
    console.log("image deleted");
  });
}

module.exports = { updateProfile, updateImage };
