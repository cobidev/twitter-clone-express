const Tweet = require('../modelos/tweet');

/* Create tweet */
exports.postTweet = (req, res, next) => {
  // Get tweet content for body request
  const texto = req.body.texto;
  // If text content of tweet doesnt exist redirect to home
  if (!texto) {
    req.flash('errores', {message: 'Por favor ingresar texto antes de enviar'});
    return res.redirect('/');
  }
  // Create tweet
  const tweet = new Tweet({
    texto,
    usuario: req.user._id,
  });
  // Save tweet
  tweet.save()
    .then(() => {
      res.redirect('/')
    })
}

/* Show tweets per user */
exports.getTweetsParaUsuarios = (usuarioIds) => {
  return Tweet
    .find({usuario: {$in: usuarioIds}})
    .sort({createdAt: -1})
    .populate('usuario');
}