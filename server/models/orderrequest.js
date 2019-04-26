const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderrequestSchema = new Schema({
  requestId:String,
  buyerName:String,
  buyerPhone:Number,
  buyerAddress:String,
  buyerCity:String,
  description:String,
  urgency:String,
  sellerName:String,
  sellerPhone:Number,
  sellerAddress:String,
  sellerCity:String,
  prdctCategory:String,
  prdctName:String,
  prdctUnit:String,
  prdctQty:String,
  prdctAvlplace:String,
});

module.exports = mongoose.model('orderrequest', orderrequestSchema, 'orderrequest');
