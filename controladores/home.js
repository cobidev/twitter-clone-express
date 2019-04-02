const controladorTweets = require('./tweet');

exports.getHome = (req, res) => {
  if (req.user) {
    controladorTweets.getTweetsParaUsuarios(req.user.siguiendo)
      .then((tweets) => {
        res.render('home', {tweets});
      })
  } else {
    res.render('home');
  }
}