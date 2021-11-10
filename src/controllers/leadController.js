const leadModel = require("../database/models/index.js").Lead;
const invoiceModel = require("../database/models/index.js").Invoice;
const voucherCodes = require("voucher-code-generator");

async function createLeads(req, res) {
  const {
    firstLeadName,
    firstLeadNumber,
    secondLeadName,
    secondLeadNumber,
    invoiceUuid,
    userUuid,
    friendsName,
    friendsNumber,
  } = req.body;

  //first lead
  const firstLead = await leadModel.create({
    invoiceUuid,
    name: firstLeadName,
    number: firstLeadNumber,
    friendsName,
    friendsNumber,
    couponCode: await createCoupon(),
    UserUuid: userUuid,
  });
  firstLead.save();

  //second lead
  const secondLead = await leadModel.create({
    invoiceUuid,
    name: secondLeadName,
    number: secondLeadNumber,
    friendsName,
    friendsNumber,
    CouponCode: await createCoupon(),
    UserUuid: userUuid,
  });
  secondLead.save();

  //update discount Level
  if (firstLead && secondLead) {
    updateDiscountLevel(invoiceUuid);

    res.json({
      status: 200,
      message: "Leads Created",
    });
    return;
  }
}

async function getAllLeads(req, res) {}

async function getLead(req, res) {
  const { uuid } = req.body;
}

async function createCoupon() {
  return voucherCodes.generate({
    length: 5,
    count: 1,
  });
}

async function updateDiscountLevel(invoiceId) {
  const invoice = await invoiceModel.findOne({ where: { uuid: invoiceId } });
  if (invoice) {
    invoice.discountLevel = invoice.discountLevel + 1;
    invoice.save();
    return;
  }
}

module.exports = {
  getAllLeads,
  createLeads,
  getLead,
};
