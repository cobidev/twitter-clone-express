const User = require('../models/user');
const controladorTweet = require('./tweet');

// SHOW informacion sobre mi usuario
exports.getMyProfile = (req, res) => {
  getInformacionPerfil(req.user._id)
    .then(([user, tweets]) => {
      res.render('profile', {
        user: user,
        tweets: tweets,
        isFollowing: false,
        hideButtons: true
      })
    })
}

// DELETE usuario actual (mi perfil)
exports.destroyProfile = (req, res) => {
  User.findOneAndDelete({ _id: req.user._id }, (err) => {
    if (err) {
      req.flash('error', 'Unable to delete your account!');
      return res.redirect('back');
    }
    req.logout();
    res.redirect('/');
  })
}

// SHOW informacion de perfil de otro usuario
exports.getProfile = (req, res) => {
  const userId = req.params.id;
  const isFollowing = req.user ? req.user.following.indexOf(userId) > -1 : false;
  const hideButtons = req.user ? false : true;

  if (req.user && req.user._id.equals(userId)) {
    return res.redirect('/profile/me');
  }

  getInformacionPerfil(userId)
    .then(([user, tweets]) => {
      res.render('profile', {
        user: user,
        tweets: tweets,
        isFollowing,
        hideButtons
      })
    })
}

// Function que retorna el usuario y sus tweets
const getInformacionPerfil = (usuarioId) => {
  return Promise.all([
    User.findOne({
      _id: usuarioId
    }),
    controladorTweet.getTweetsParaUsuarios([usuarioId])
  ])
}

// GET profile/follow/:id - Logica para seguir usuario y que el usuario target se le agregue el seguidor
exports.followUser = (req, res) => {
  const usuarioLogueadoId = req.user.id;
  const usuarioId = req.params.id

  Promise.all([
    agregarSiguiendo(usuarioLogueadoId, usuarioId),
    agregarSeguidor(usuarioLogueadoId, usuarioId),
  ]).then(() => {
    res.redirect(`/profile/${usuarioId}`);
  });
}

// GET profile/unfollow/:id - Logica para seguir usuario y que el usuario target se le agregue el seguidor
exports.unfollowUser = (req, res) => {
  const usuarioLogueadoId = req.user.id;
  const usuarioId = req.params.id

  Promise.all([
    eliminarSiguiendo(usuarioLogueadoId, usuarioId),
    eliminarSeguidor(usuarioLogueadoId, usuarioId),
  ]).then(() => {
    res.redirect(`/profile/${usuarioId}`);
  });
}

// Funciones para agregar/eliminar siguiendo y seguidor
const agregarSiguiendo = (usuarioLogueadoId, usuarioId) => {
  return User.findOneAndUpdate({
      _id: usuarioLogueadoId // Find current user by id
    },
    {
      $push: {
        following: usuarioId // Update to push new following user
      }
    }
  );
}
const agregarSeguidor = (usuarioLogueadoId, usuarioId) => {
  return User.findOneAndUpdate({
    _id: usuarioId, // Find target user by id
  }, {
    $push: {
      followers: usuarioLogueadoId // Update to push new follower from currentUser
    }
  });
}
const eliminarSiguiendo = (usuarioLogueadoId, usuarioId) => {
  return User.findOneAndUpdate({
      _id: usuarioLogueadoId // Find current user by id
    }, 
    {
      $pull: {
        following: usuarioId // Update to delete following user
      }
    } 
  );
}
const eliminarSeguidor = (usuarioLogueadoId, usuarioId) => {
  return User.findOneAndUpdate({
    _id: usuarioId, // Find target user by id
  }, {
    $pull: {
      followers: usuarioLogueadoId // Update to pull/remove follower currentUser
    } 
  });
}