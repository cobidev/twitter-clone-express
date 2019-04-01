const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

// Creacion del Schema del modelo usuario
const usuarioSchema = new mongoose.Schema({
  email: {type: String, unique: true, lowercase: true, required: true},
  password: {type: String, required: true},
  nombre: {type: String, required: true},
  biografia: { type: String},
  siguiendo: [{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}],
  seguidores: [{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}]
}, {
  timestamps: true
});

// Funciones antes de salvar el usuario en la base de datos
usuarioSchema.pre('save', function (next) {
  const usuario = this;

  // Inicializar primer seguidor/siguiendo como el mismo, para visualizar sus datos en el feed
  const usuarioId = usuario._id;
  if (usuario.siguiendo.indexOf(usuarioId) === -1) {
    usuario.siguiendo.push(usuarioId);
    usuario.seguidores.push(usuarioId);
  }

  // Encriptar password
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

// Methodo para comparar password
usuarioSchema.methods.compararPassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, sonIguales) => {
    if (err) {
      callback(err);
    }
    callback(null, sonIguales);
  })
}
// Metodo para generar avatar unico del usuario
usuarioSchema.methods.obtenerAvatar = function (dimension=55) {
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://api.adorable.io/avatars/${dimension}/${md5}`;
}

module.exports = mongoose.model('Usuario', usuarioSchema);