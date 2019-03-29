const mongoose = require('mongoose');
validityTime = 120;
const Schema = mongoose.Schema;

const multipostSchema = new Schema(
  {
    category: String,
    avlPlace: {
      lat: '',
      lng: '',
      formatted_address: '',
      locality: '',
      admin_area_l1: '',
      country: '',
      postal_code: ''
    },
    description: String,
    image: String,
    validityTime: Date,
    accountId: String,
    date: String,
    username: String,
    userNumber: Number,
    userAddressLine: String,
    userAddress: String,
    status: String,
    count: { type: Number, default: 1 },
});

module.exports = mongoose.model('multipost', multipostSchema, 'multipost');
