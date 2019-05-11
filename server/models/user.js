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
  status: String,
  role: String,
  roleStatus: String,
  credits: { type: Number, default: 0 },
  creditDetails: [
    {
      credit: Number,
      productName: String,
      category: String,
      quantity: String,
      qnty: String,
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
      createdAt: Date
    }
  ],
  buyerdispute: [
    {
      sellerName: String,
      sellerId: String,
      disputerName: String,
      disputerId: String,
      productId: String,
      orderRqstId: String,
      disputeId: String,
      dispute: String,
      createdAt: Date
    }
  ]
});

module.exports = mongoose.model('user', userSchema, 'users');
