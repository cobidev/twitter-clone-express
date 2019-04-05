const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const crypto = require('crypto');

// Creacion del Schema del modelo usuario
const userSchema = new mongoose.Schema({
  email: {type: String, unique: true, lowercase: true, required: true},
  name: {type: String, required: true},
  username: {type: String, unique: true, required: true},
  password: {type: String},
  bio: { type: String},
  following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, {
  timestamps: true
});

// Metodo para generar avatar unico del usuario
userSchema.methods.obtenerAvatar = function (dimension=55) {
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://api.adorable.io/avatars/${dimension}/${md5}`;
}

// Funciones antes de salvar el usuario en la base de datos
userSchema.pre('save', function (next) {
  const user = this;
  // Inicializar primer seguidor/siguiendo como el mismo, para visualizar sus datos en el feed
  const userId = user._id;
  if (user.following.indexOf(userId) === -1) {
    user.following.push(userId);
    user.followers.push(userId);
  }

  return next();
})

// Add passport salt to UserSchema
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);