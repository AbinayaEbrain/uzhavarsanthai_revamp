const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: String,
  device_token: String,
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
  status: String,
  role: String,
  roleStatus: String,
  credits: { type: Number, default: 0 },
  subscriptionName: String,
  subscriptionId: String,
  subscription: [
    {
      subscription: String,
      amount: String,
      credit: String,
      status: String,
      planType: String,
      createdAt: Date
    }
  ],
  creditDetails: [
    {
      credit: Number,
      productName: String,
      category: String,
      quantity: String,
      // qnty: String,
      price: Number,
      image: String,
      productId: String,
      productCreatedAt: Date
    }
  ],
  productreview: [
    {
      review: String,
      starValue: String,
      buyerId: String,
      buyerName: String,
      prdctId: String,
      sellerId: String,
      sellerName: String,
      reviewRqstId: String
    }
  ],
  dispute: [
    {
      ticketId: String,
      buyerName: String,
      buyerId: String,
      disputerName: String,
      disputerId: String,
      productId: String,
      orderRqstId: String,
      disputeId: String,
      dispute: String,
      requestId: String,
      disputeStatus: String,
      solution: { type: String, default: '' },
      against: String,
      createdAt: Date
    }
  ],
  buyerdispute: [
    {
      ticketId: String,
      sellerName: String,
      sellerId: String,
      disputerName: String,
      disputerId: String,
      productId: String,
      orderRqstId: String,
      disputeId: String,
      requestId: String,
      dispute: String,
      disputeStatus: String,
      solution: { type: String, default: '' },
      against: String,
      createdAt: Date
    }
  ]
});

module.exports = mongoose.model('user', userSchema, 'users');
