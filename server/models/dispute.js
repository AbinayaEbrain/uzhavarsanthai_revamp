const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const disputeSchema = new Schema({
  ticketId: String,
  buyerName: String,
  buyerId: String,
  disputerName: String,
  disputerId: String,
  productId: String,
  orderRqstId: String,
  dispute: String,
  requestId: String,
  disputeStatus: String,
  solution: { type: String, default: '' },
  against: String,
  createdAt: Date
});

module.exports = mongoose.model('dispute', disputeSchema, 'dispute');
