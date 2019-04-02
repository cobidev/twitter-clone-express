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
    Usuario.findOne({
      _id: usuarioId
    }),
    controladorTweet.getTweetsParaUsuarios([usuarioId])
  ])
}

// GET /seguir/:id - Logica para seguir usuario y que el usuario target se le agregue el seguidor
exports.seguirUsuario = (req, res) => {
  const usuarioLogueadoId = req.user.id;
  const usuarioId = req.params.id

  Promise.all([
    agregarSiguiendo(usuarioLogueadoId, usuarioId),
    agregarSeguidor(usuarioLogueadoId, usuarioId),
  ]).then(() => {
    res.redirect(`/perfil/${usuarioId}`);
  });
}

// GET /unseguir/:id - Logica para seguir usuario y que el usuario target se le agregue el seguidor
exports.unseguirUsuario = (req, res) => {
  const usuarioLogueadoId = req.user.id;
  const usuarioId = req.params.id

  Promise.all([
    eliminarSiguiendo(usuarioLogueadoId, usuarioId),
    eliminarSeguidor(usuarioLogueadoId, usuarioId),
  ]).then(() => {
    res.redirect(`/perfil/${usuarioId}`);
  });
}

// Funciones para agregar/eliminar siguiendo y seguidor
const agregarSiguiendo = (usuarioLogueadoId, usuarioId) => {
  return Usuario.findOneAndUpdate({
      _id: usuarioLogueadoId
    }, // Find current user by id
    {
      $push: {
        siguiendo: usuarioId
      }
    } // Update to push new following user
  );
}
const agregarSeguidor = (usuarioLogueadoId, usuarioId) => {
  return Usuario.findOneAndUpdate({
    _id: usuarioId, // Find target user by id
  }, {
    $push: {
      seguidores: usuarioLogueadoId
    } // Update to push new follower from currentUser
  });
}
const eliminarSiguiendo = (usuarioLogueadoId, usuarioId) => {
  return Usuario.findOneAndUpdate({
      _id: usuarioLogueadoId
    }, // Find current user by id
    {
      $pull: {
        siguiendo: usuarioId
      }
    } // Update to delete following user
  );
}
const eliminarSeguidor = (usuarioLogueadoId, usuarioId) => {
  return Usuario.findOneAndUpdate({
    _id: usuarioId, // Find target user by id
  }, {
    $pull: {
      seguidores: usuarioLogueadoId
    } // Update to pull/remove follower currentUser
  });
}