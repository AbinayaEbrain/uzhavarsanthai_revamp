const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  bloggerName: String,
  username: String,
  commenttext: String,
  createdAt: Date
});

module.exports = mongoose.model('blog', blogSchema, 'blog');
