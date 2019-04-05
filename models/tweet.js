const mongoose = require('mongoose');

// Creacion del Schema del modelo tweets
const tweetSchema = new mongoose.Schema({
  text: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Tweet', tweetSchema);