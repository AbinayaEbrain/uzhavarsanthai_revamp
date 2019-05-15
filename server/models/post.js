const mongoose = require('mongoose');
validityTime = 120;
const Schema = mongoose.Schema;
const postSchema = new Schema({
  category: String,
  categoryId: String,
  name: String,
  quantity: String,
  qnty: String,
  subQuantity: String,
  subqnty: String,
  price: Number,
  description: String,
  accountId: String,
  date: String,
  ipAddress: String,
  validityTime: Date,
  image: String,
  avlPlace: {
    lat: '',
    lng: '',
    formatted_address: '',
    locality: '',
    admin_area_l1: '',
    country: '',
    postal_code: ''
  },
  username: String,
  lastname: String,
  userNumber: Number,
  userAddressLine: String,
  userAddress: String,
  status: String,
  count: { type: Number, default: 1 },
  bulk: false,
  orderrequests: [
    {
      requestedPersonId: String,
      requestedProductId: String,
      orderStatus: String,
      orderRqstId: String
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
      solution: {type: String , default:''},
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
      requestId: String,
      disputeId: String,
      dispute: String,
      disputeStatus: String,
      solution: {type: String , default:''},
      createdAt: Date
    }
  ]
});
module.exports = mongoose.model('post', postSchema, 'post');
