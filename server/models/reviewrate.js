const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewrateSchema = new Schema({
  review: String,
  starValue: String,
  buyerId: String,
  buyerName: String,
  prdctId: String,
  sellerId: String,
  sellerName: String,
  reviewRqstId : String,
  createdAt: Date
});

module.exports = mongoose.model('reviewrate', reviewrateSchema, 'reviewrate');
