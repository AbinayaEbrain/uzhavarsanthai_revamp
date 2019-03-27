const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const devicedataSchema = new Schema({
  deviceId: String,
  devicePlat: String,
  deviceMade: String,
  deviceSerial: String,
  deviceModal: String,
  deviceVersion: String,
  deviceLatitute: String,
  deviceLongtitute: String
});

module.exports = mongoose.model('devicedata', devicedataSchema, 'devicedata');
