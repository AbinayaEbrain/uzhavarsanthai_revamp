const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderrequestSchema = new Schema({
  createdAt: Date,
  requestId: String,
  buyerId: String,
  buyerName: String,
  buyerPhone: Number,
  buyerAddress: String,
  buyerCity: String,
  description: String,
  urgency: String,
  sellerName: String,
  sellerPhone: Number,
  sellerAddress: String,
  sellerCity: String,
  prdctId: String,
  sellerId: String,
  prdctCategoryId: String,
  prdctCategory: String,
  prdctName: String,
  prdctUnit: String,
  prdctQty: String,
  prdctAvlplace: String,
  status: String,
  requiredQuantity: String,
  requiredUnit: String,
  sellerStatus: { type: String, default: 'Order created' },
  image: String
});

module.exports = mongoose.model(
  'orderrequest',
  orderrequestSchema,
  'orderrequest'
);
