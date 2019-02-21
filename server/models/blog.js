const mongoose = require('mongoose')

const Schema= mongoose.Schema

const blogSchema = new Schema({
    //productId:String,
    username:String,
    commenttext:String
})

module.exports = mongoose.model('blog',blogSchema,'blog')