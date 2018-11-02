const mongoose = require('mongoose')

const Schema= mongoose.Schema

const userSchema = new Schema({
    firstname:String,
    lastName:String,
    gender:String,
    address: {
        addressLine:String,
        address1:String,
        city:String,
        location:String,
    },
    password:String,
    confirmPassword:String,
    phone:Number,
    privateIP:String,
    status:String
    
})

module.exports = mongoose.model('user',userSchema,'users')