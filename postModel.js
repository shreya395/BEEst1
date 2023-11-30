const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 255 },
  content: { type: String, required: true, maxlength: 5000 },
  author: { type: String, required: true },
  tags: [{ type: String, maxlength: 50 }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = mongoose.model('Post', postSchema);
