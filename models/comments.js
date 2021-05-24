const mongoose = require('mongoose')

const Comment = mongoose.model('Comment', new mongoose.Schema({
  comment: String,
  parentTag: String,
  dateCreated: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}))


module.exports = Comment
