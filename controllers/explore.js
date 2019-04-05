const User = require('../models/user');

exports.getExplore = (req, res, next) => {
  res.render('explore', {users: []});
}

exports.postExplore = (req, res, next) => {
  const query = req.body.query;

  User.find({name: new RegExp(`.*${query}.*`, 'i')})
    .select('_id name bio email')
    .then((users) => {
      res.render('explore', {users});
    })
}