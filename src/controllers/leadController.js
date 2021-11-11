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

  let coupon = await createCoupon();

  //first lead
  const firstLead = await leadModel.create({
    invoiceUuid,
    name: firstLeadName,
    number: firstLeadNumber,
    friendsName,
    friendsNumber,
    couponCode: coupon[0],
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
    couponCode: coupon[1],
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

async function getAllLeads(req, res) {
  const { userUuid } = req.body;

  leads = await leadModel.findAll({ where: { UserUuid: userUuid } });
  if (leads) {
    res.json({
      status: 200,
      data: leads,
    });
    return;
  }
}

async function getLead(req, res) {
  const { uuid } = req.body;
  const lead = await leadModel.findOne({ where: { uuid: uuid } });
  if (lead) {
    res.json({
      status: 200,
      data: lead,
    });
    return;
  }
}

async function createCoupon() {
  let coupon = voucherCodes.generate({
    length: 5,
    count: 2,
  });
  return coupon;
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
