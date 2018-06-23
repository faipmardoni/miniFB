const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentSchema = new schema({
  comment: String,
  user: { type: schema.Types.ObjectId, ref: 'User' },
  status: { type: schema.Types.ObjectId, ref: 'Status'}
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;