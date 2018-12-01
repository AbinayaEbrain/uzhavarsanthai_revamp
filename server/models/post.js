const mongoose = require('mongoose')

const Schema= mongoose.Schema

const postSchema = new Schema({
    category:String,
    categoryId:String,
    name:String,
    quantity:String,
    qnty:String,
    subQuantity:String,
    subqnty:String,
    price:String,
    description:String,
    accountId:String,
    date:String,
    ipAddress:String,
    avlPlace:{
        avlplaceName:String,
            latitude:String,
            longtitude:String  
    },
   
})

module.exports = mongoose.model('post',postSchema,'post')