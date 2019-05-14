const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  ticketId: String,
  ticketStatus: String,
  ticketTitle: String,
  ticketDescription: String,
  username: String,
  userphone: String,
  userrole: String,
  createddate: String,
  solution: String,
  userid: String
});

module.exports = mongoose.model('ticket', ticketSchema, 'ticket');
