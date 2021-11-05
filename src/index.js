const os = require("os");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

const multer = require("multer");
const upload = multer({ dest: os.tmpdir() });

const authController = require("./controllers/authController.js");
const profileController = require("./controllers/profileController.js");

app.get("/", async (req, res) => {
  res.json("Pealeap Api 1.0.0");
});

app.post("/signin", authController.signInUser);

app.post(
  "/update.picture",
  upload.single("picture"),
  profileController.updateImage
);

app.get("/update.profile", profileController.updateProfile);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
