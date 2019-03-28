const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  msgTile:String,
  msgBody:String,
  msgCategory:String
});

module.exports = mongoose.model('notification', notificationSchema, 'notification');
