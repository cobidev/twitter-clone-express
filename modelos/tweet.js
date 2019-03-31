const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  texto: String,
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Tweet', tweetSchema);