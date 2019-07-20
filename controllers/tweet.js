const Tweet = require('../models/tweet');

module.exports = {
  // CREATE tweet
  postTweet(req, res, next) {
    // Get tweet content for body request
    const text = req.body.text;
    // If text content of tweet doesnt exist redirect to home
    if (!text) {
      req.flash('error', 'Por favor ingresar texto antes de enviar!');
      return res.redirect('/');
    }
    // Create tweet
    const tweet = new Tweet({
      text,
      user: req.user._id
    });
    // Save tweet
    tweet.save().then(() => {
      req.flash('success', 'Tweet creado satisfactoriamente!');
      res.redirect('/');
    });
  },

  // Delete tweet
  deleteTweet(req, res, next) {
    Tweet.findOneAndDelete({ user: req.user._id }, err => {
      if (err) {
        req.flash('error', 'Unable to delete this Tweet!');
        return res.redirect('back');
      }
      res.redirect('/profile/me');
    });
  },

  /* Show tweets per user */
  getTweetsParaUsuarios(usuarioIds) {
    return Tweet.find({ user: { $in: usuarioIds } })
      .sort({ createdAt: -1 })
      .populate('user');
  }
};
