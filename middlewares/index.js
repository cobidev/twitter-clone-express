exports.isLoggedIn = (req, res, next) => {
  if (!req.user || !req.isAuthenticated) {
    return res.redirect('back');
  }
  next()
}