const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const buyerdisputeSchema = new Schema({
  ticketId: String,
  sellerName: String,
  sellerId: String,
  disputerName: String,
  disputerId: String,
  prdctId: String,
  orderRqstId: String,
  dispute: String,
  disputeStatus: String,
  requestId: String,
  solution: { type: String, default: '' },
  createdAt: Date
});

module.exports = mongoose.model(
  'buyerdispute',
  buyerdisputeSchema,
  'buyerdispute'
);
