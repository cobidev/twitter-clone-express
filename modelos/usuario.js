const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Encriptar password
usuarioSchema.pre('save', function (next) {
  const usuario = this;
  if (!usuario.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      next(err);
    }
    bcrypt.hash(usuario.password, salt, null, (err, hash) => {
      if (err) {
        next(err)
      }
      usuario.password = hash;
      next();
    })
  })
})

// Comparar password
usuarioSchema.methods.compararPassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, sonIguales) => {
    if (err) {
      callback(err);
    }
    callback(null, sonIguales);
  })
}

module.exports = mongoose.model('Usuario', usuarioSchema);