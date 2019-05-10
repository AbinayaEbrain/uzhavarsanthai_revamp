const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const buyerdisputeSchema = new Schema({
  sellerName: String,
  sellerId: String,
  disputerName: String,
  disputerId: String,
  prdctId: String,
  orderRqstId: String,
  dispute: String,
  disputeStatus: String,
  createdAt: Date
});

module.exports = mongoose.model('buyerdispute', buyerdisputeSchema, 'buyerdispute');
