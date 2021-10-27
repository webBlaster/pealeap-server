const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

const authController = require("./controllers/authController.js");

app.get("/", async (req, res) => {
  res.json("Pealeap Api 1.0.0");
});

app.post("/signin", authController.signInUser);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
