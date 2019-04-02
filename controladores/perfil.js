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

// SHOW /perfil/:id - Mostrar informacion de perfil de otro usuario
exports.getPerfil = (req, res) => {
  const usuarioId = req.params.id;
  const estaFollowing = req.user ? req.user.siguiendo.indexOf(usuarioId) > -1 : false;
  const esconderBotones = req.user ? false : true;

  if (req.user && req.user._id.equals(usuarioId)) {
    return res.redirect('/mi/perfil');
  }

  getInformacionPerfil(usuarioId)
    .then(([usuario, tweets]) => {
      res.render('perfil', {
        usuario: usuario,
        tweets: tweets,
        estaFollowing,
        esconderBotones
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