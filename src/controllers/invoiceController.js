const invoiceModel = require("../database/models/invoice.js").Invoice;

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
  const invoice = await invoiceModel.findAll({ where: { UserUuid: userId } });
  if (invoice) {
    res.json({
      status: 200,
      data: invoice,
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

module.exports = {
  getAllInvoice,
  createInvoice,
  getInvoice,
};
