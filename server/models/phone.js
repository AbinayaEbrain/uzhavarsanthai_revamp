const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const phoneSchema = new Schema({
  phone: Number,
  otp: Number
});

module.exports = mongoose.model('phone', phoneSchema, 'phone');
