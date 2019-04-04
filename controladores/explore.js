const Usuario = require('../modelos/usuario');

exports.getExplore = (req, res, next) => {
  res.render('explorar', {usuarios: []});
}

exports.postExplore = (req, res, next) => {
  const query = req.body.query;

  Usuario.find({nombre: new RegExp(`.*${query}.*`, 'i')})
    .select('_id nombre biografia email')
    .then((usuarios) => {
      res.render('explorar', {usuarios});
    })
}