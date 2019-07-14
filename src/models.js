const mongoose = require('mongoose');

const Username = mongoose.model('Username', { username: { type: String, required: true }});

const Exercise = mongoose.model('Exercise', {
  userId: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: String,
});

module.exports = {
  Username,
  Exercise,
}