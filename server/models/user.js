const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: String,
  address: {
    addressLine: String,
    address1: String,
    city: {
      lat: '',
      lng: '',
      formatted_address: '',
      locality: '',
      admin_area_l1: '',
      country: '',
      postal_code: ''
    }
  },
  password: String,
  confirmPassword: String,
  privateIP: String,
  phone: Number,
  status: String
});

module.exports = mongoose.model('user', userSchema, 'users');
