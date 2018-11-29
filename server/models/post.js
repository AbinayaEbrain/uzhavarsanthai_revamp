const mongoose = require('mongoose')

const Schema= mongoose.Schema

const postSchema = new Schema({
    category:String,
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
    avlPlace:{
        avlplaceName:String,
            latitude:String,
            longtitude:String

        
    },
   
})

module.exports = mongoose.model('post',postSchema,'post')