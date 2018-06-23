const mongoose = require('mongoose');
const schema = mongoose.Schema;

const statusSchema = new schema({
  status: { type: String, default: 'no_title' },
  image: { type: String },
  user: { type: schema.Types.ObjectId, ref: 'User' },
  likes: [{
    type: schema.Types.ObjectId, ref: 'User'
  }],
  comments: [{
    type: schema.Types.ObjectId, ref: 'Comment'
  }]
});

const Status = mongoose.model('Status', statusSchema);
module.exports = Status;