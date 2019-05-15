const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  subscription: String,
  amount: String,
  credit: String,
  status: String,
  createdAt: Date
});

module.exports = mongoose.model(
  'subscription',
  subscriptionSchema,
  'subscription'
);
