const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const authController = require("./controllers/authController.js");

app.get("/", async (req, res) => {
  res.json("Pealeap Api 1.0.0");
});

app.get("/signin", authController.signInUser);

const port = process.env.port || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
