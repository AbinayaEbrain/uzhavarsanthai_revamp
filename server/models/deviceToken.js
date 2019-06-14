const mongoose = require('mongoose')

const Schema= mongoose.Schema

const deviceTokenSchema = new Schema({
    token:String,
})

module.exports = mongoose.model('deviceToken',deviceTokenSchema,'deviceToken')