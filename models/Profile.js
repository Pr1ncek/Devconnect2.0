const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  handle: {
    type: String,
    required: true,
    maxlength: 40
  },
  avatarURL: {
    type: String,
    default: 'https://cdn.hipwallpaper.com/i/99/37/fwSGrR.jpg'
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubUsername: {
    type: String
  },
  experience: [
    {
      title: { type: String, required: true },
      company: { type: String, required: true },
      location: { type: String, required: true },
      from: { type: Date, required: true },
      to: { type: Date },
      current: { type: Boolean, default: false },
      description: { type: String }
    }
  ],
  education: [
    {
      institute: { type: String, required: true },
      degree: { type: String, required: true },
      major: { type: String, required: true },
      location: { type: String, required: true },
      from: { type: Date, required: true },
      to: { type: Date },
      current: { type: Boolean, default: false },
      description: { type: String }
    }
  ],
  social: {
    linkedin: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    youtube: { type: String },
    instagram: { type: String }
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Profile', profileSchema);
