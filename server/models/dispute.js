const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const disputeSchema = new Schema({
  buyerName: String,
  buyerId: String,
  disputerName: String,
  disputerrId: String,
  productId: String,
  orderRqstId: String,
  dispute: String,
  createdAt: Date
});

module.exports = mongoose.model('dispute', disputeSchema, 'dispute');
