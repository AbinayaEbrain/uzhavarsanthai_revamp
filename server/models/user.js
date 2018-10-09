const mongoose = require('mongoose')

const Schema= mongoose.Schema

const userSchema = new Schema({
    firstname:String,
    lastName:String,
    gender:String,
    address:String,
    address1:String,
    location:String,
    password:String,
    confirmPassword:String,
    phone:Number
})

module.exports = mongoose.model('user',userSchema,'users')