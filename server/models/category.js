const mongoose = require('mongoose')

const Schema= mongoose.Schema

const cateSchema = new Schema({
    //productId:String,
    productCategory:String
})

module.exports = mongoose.model('category',cateSchema,'category')