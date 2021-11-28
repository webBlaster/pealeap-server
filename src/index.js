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
const invoiceController = require("./controllers/invoiceController.js");
const leadController = require("./controllers/leadController.js");

app.get("/", async (res) => {
  res.json("Pealeap Api 1.0.0");
});

app.post("/signin", authController.signInUser);
app.post("/subscribe", authController.subscribeUser);

//profile
app.post(
  "/update.picture",
  upload.single("picture"),
  profileController.updateImage
);
app.post("/update.profile", profileController.updateProfile);
app.post("/profile", profileController.getProfile);

//invoices
app.post("/invoice.update.payment", invoiceController.updateInvoiceToPaid);
app.post("/create.invoice", invoiceController.createInvoice);
app.post("/invoice", invoiceController.getInvoice);
app.post("/invoices", invoiceController.getAllInvoice);
app.post("/coupon.code", leadController.useCouponCode);

//leads
app.post("/leads.update.marked", leadController.updateLeadToMarked);
app.post("/create.leads", leadController.createLeads);
app.post("/leads", leadController.getAllLeads);
app.post("/lead", leadController.getLead);

//utilities
app.post("/invoice.totals", invoiceController.getInvoiceTotals);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
