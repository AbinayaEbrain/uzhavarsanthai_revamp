const mongoose = require('mongoose')
validityTime = 120
const Schema= mongoose.Schema
const postSchema = new Schema({
    category:String,
    categoryId:String,
    name:String,
    quantity:String,
    qnty:String,
    subQuantity:String,
    subqnty:String,
    price:Number,
    description:String,
    accountId:String,
    date:String,
    categoryId:String,
    ipAddress:String,
    validityTime:String,
    avlPlace:{
        avlplaceName:String,
            latitude:String,
            longtitude:String  
    },
    expireAt: {
        type: Date, required: true,
        default: function() {
            return new Date(new Date(this.validityTime));
        },expires : 60 
    }
 
})

module.exports = mongoose.model('post',postSchema,'post')