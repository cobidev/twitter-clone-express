const passport = require('passport');
const Usuario = require('../modelos/usuario');

// GET Log In
exports.getLogin = (req, res, next) => {
  res.render('login');
}

// GET Sign Up
exports.getSignup = (req, res, next) => {
  res.render('signup');
}

// POST Sign Up
exports.postSignup = (req, res, next) => {
  if (!req.body.email || !req.body.nombre || !req.body.biografia) {
    req.flash('errores', {message: 'Debes llenar todos los campos!'});
    return res.redirect('/signup');
  }

  const nuevoUsuario = new Usuario({
    email: req.body.email,
    nombre: req.body.nombre,
    password: req.body.password,
    biografia: req.body.biografia
  });

  Usuario.findOne({email: req.body.email}, (err, usuarioExistente) => {
    if (usuarioExistente) {
      return res.status(400).send('Ya ese email esta registrado')
    }
    nuevoUsuario.save((err) => {
      if (err) {
        next(err);
      }
      req.logIn(nuevoUsuario, (err) => {
        if (err) {
          next(err);
        }
        res.redirect('/')
      })
    })
  })
}

// POST Log In
exports.postLogin = (req, res, next) => {
  passport.authenticate('local', (err, usuario, info) => {
    if (err) {
      next(err);
    }
    if (!usuario) {
      req.flash('errores', {message: 'Email o password no validos!'});
      return res.redirect('/login');
    }
    req.logIn(usuario, (err) => {
      if (err) {
        next(err);
      }
      res.redirect('/')
    })
  })(req, res, next)
}

// GET Log Out
exports.getLogout = (req, res, next) => {
  req.logout();
  res.redirect('/');
}