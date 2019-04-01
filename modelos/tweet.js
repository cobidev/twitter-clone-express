const mongoose = require('mongoose');

// Creacion del Schema del modelo tweets
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