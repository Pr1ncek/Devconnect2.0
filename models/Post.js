const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String },
  avatarURL: { type: String },
  likes: [{ user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' } }],
  comments: [
    {
      user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
      title: { type: String, required: true },
      content: { type: String, required: true },
      author: { type: String },
      avatarURL: { type: String },
      date: { type: Date, default: Date.now() }
    }
  ],
  date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Post', postSchema);
