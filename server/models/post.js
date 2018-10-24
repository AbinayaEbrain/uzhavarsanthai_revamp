const mongoose = require('mongoose')

const Schema= mongoose.Schema

const postSchema = new Schema({
    category:String,
    name:String,
    quantity:String,
    qnty:String,
    price:String,
    description:String,
    accountId:String,
    date:String,
    avlPlace:String
    
})

module.exports = mongoose.model('post',postSchema,'post')