const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trackinformationSchema = new Schema({
  UserId: String,
  apiName: String,
  jwt: String,
  response: String,
  apiCallingAt: Date
});

module.exports = mongoose.model(
  'trackinformation',
  trackinformationSchema,
  'trackinformation'
);
