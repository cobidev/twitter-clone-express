const Usuario = require('../modelos/usuario');
const controladorTweet = require('./tweet');

// SHOW /mi/perfil - Mostrar informacion de perfil propio
exports.getMiPerfil = (req, res) => {
  getInformacionPerfil(req.user._id)
    .then(([usuario, tweets]) => {
      res.render('perfil', {
        usuario: usuario,
        tweets: tweets,
        estaFollowing: false,
        esconderBotones: true
      })
    })
}

// Function que retorna el usuario y sus tweets
const getInformacionPerfil = (usuarioId) => {
  return Promise.all([
    Usuario.findOne({_id: usuarioId}),
    controladorTweet.getTweetsParaUsuarios([usuarioId])
  ])
}