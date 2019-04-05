const Tweet = require('../models/tweet');

// CREATE tweet
exports.postTweet = (req, res, next) => {
  // Get tweet content for body request
  const text = req.body.text;
  // If text content of tweet doesnt exist redirect to home
  if (!text) {
    req.flash('errores', {message: 'Por favor ingresar texto antes de enviar'});
    return res.redirect('/');
  }
  // Create tweet
  const tweet = new Tweet({
    text,
    user: req.user._id,
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
    .find({user: {$in: usuarioIds}})
    .sort({createdAt: -1})
    .populate('user');
}