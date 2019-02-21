const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: String,
  email: String,
  phone: Number,
  message: String
});

module.exports = mongoose.model('contact', contactSchema, 'contact');
