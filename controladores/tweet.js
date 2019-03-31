const Tweet = require('../modelos/tweet');

exports.postTweet = (req, res, next) => {
  // Get tweet content for body request
  const texto = req.body.texto;
  // If text content of tweet doesnt exist redirect to home
  if (!texto) {
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