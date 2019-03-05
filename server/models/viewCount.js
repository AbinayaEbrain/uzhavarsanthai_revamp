const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const countSchema = new Schema({
  //   accountId: String,
  ipAddress: String,
  productName: String,
  productId: String,
  count: { type: Number, default: 1 }
});

module.exports = mongoose.model('count', countSchema, 'count');
