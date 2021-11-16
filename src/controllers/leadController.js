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

async function updateLeadToMarked(req, res) {
  const { uuid } = req.body;
  const lead = await leadModel.findOne({ where: { uuid: uuid } });
  if (lead) {
    lead.marked = true;
    lead.save();
    res.json({
      status: 200,
      message: "Lead updated to marked",
    });
  }
}

async function useCouponCode(req, res) {
  //get parameters
  const { code, invoiceId } = req.body;
  //fetch invoice
  const lead = await leadModel.findOne({ where: { invoiceUuid: invoiceId } });
  if (!lead) return res.json({ status: 404, message: "Invoice not found" });
  //check if token has been used
  if (lead.couponUsed)
    return res.json({ status: 404, message: "Code already used" });
  //compare token
  if (lead.couponCode !== code)
    return res.json({ status: 404, message: "Code is incorrect" });

  //invalidate
  lead.couponUsed = true;
  lead.save();
  //increase discountLevel
  const invoice = await invoiceModel.findOne({ where: { uuid: invoiceId } });
  if (!invoice) return res.json({ status: 404, message: "Coupon Failed" });
  invoice.discountLevel = discountLevel++;
  invoice.save();
  res.json({ status: 200, message: "coupon Applied" });
}

module.exports = {
  getAllLeads,
  createLeads,
  getLead,
  updateLeadToMarked,
  updateDiscountLevel,
  useCouponCode,
};
