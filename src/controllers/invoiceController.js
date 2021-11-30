const invoiceModel = require("../database/models/index.js").Invoice;

async function createInvoice(req, res) {
  const { userId, name, customerNumber, amount, note } = req.body;
  const invoice = await invoiceModel.create({
    UserUuid: userId,
    name,
    customerNumber,
    amount,
    note,
  });
  invoice.save();
  console.log(invoice);
  res.json({
    status: 200,
    message: "Invoice Created",
  });
}

async function getAllInvoice(req, res) {
  const { userId } = req.body;
  const invoices = await invoiceModel.findAll({
    where: { UserUuid: userId },
    order: [["createdAt", "DESC"]],
  });
  if (invoices) {
    res.json({
      status: 200,
      data: invoices,
    });
    return;
  }
}

async function getInvoice(req, res) {
  const { uuid } = req.body;
  const invoice = await invoiceModel.findOne({ where: { uuid: uuid } });
  if (invoice) {
    res.json({
      status: 200,
      data: invoice,
    });
    return;
  }
}

async function updateInvoiceToPaid(req, res) {
  const { uuid } = req.body;
  const invoice = await invoiceModel.findOne({ where: { uuid: uuid } });
  if (invoice) {
    invoice.paid = true;
    invoice.save();
    res.json({
      status: 200,
      message: "Invoice updated to paid",
    });
  }
}

async function getInvoiceTotals(req, res) {
  const { uuid } = req.body;
  const pending = await invoiceModel.sum("amount", {
    where: { UserUuid: uuid, paid: false },
  });
  const pendingDiscount = await invoiceModel.sum("discountLevel", {
    where: { UserUuid: uuid, paid: false },
  });

  const paid = await invoiceModel.sum("amount", {
    where: { UserUuid: uuid, paid: true },
  });
  const paidDiscount = await invoiceModel.sum("discountLevel", {
    where: { UserUuid: uuid, paid: true },
  });

  if (true) {
    let paidPercentage = paidDiscount * 5;
    let pendingPercentage = pendingDiscount * 5;
    let paidDiscount = paid * (paidPercentage / 100);
    let pendingDiscount = pending * (pendingPercentage / 100);
    let totalPaid = paid - paidDiscount;
    let totalPending = pending - pendingDiscount;

    res.json({
      status: 200,
      data: {
        paid: totalPaid,
        pending: totalPending,
      },
    });
  }
}
module.exports = {
  getAllInvoice,
  createInvoice,
  getInvoice,
  getInvoiceTotals,
  updateInvoiceToPaid,
};
