const mongoose = require('mongoose')

const Schema= mongoose.Schema

const subCateSchema = new Schema({
    productId:String,
    productName:String
})

module.exports = mongoose.model('subCategory',subCateSchema,'subCategory')