const express = require("express");
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('./config/passport');
const path = require('path');

const controladorUsuario = require('./controladores/usuario');

const app = express();

// MongoDB - Mongoose Setup
const MONGO_URL = 'mongodb://127.0.0.1:27017/twitter-clone';
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL, {
  useCreateIndex: true,
  useNewUrlParser: true
});
mongoose.connection.on('error', (err) => {
  throw err;
})

// Sessions
app.use(session({
  secret: 'Esto es secreto',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: MONGO_URL,
    autoReconnect: true
  })
}))

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// View Engine
app.set('views', path.join(__dirname, 'vistas'));
app.set('view engine', 'pug');

// Routes
app.post('/signup', controladorUsuario.postSignup);
app.post('/login', controladorUsuario.postLogin);
app.post('/logout', passportConfig.estaAutenticado ,controladorUsuario.getLogout);

app.get('/usuarioInfo', passportConfig.estaAutenticado, (req, res) => {
  res.json(req.user);
})

// Server Listening
app.listen(3000, () => {
  console.log("Esuchando en el puerto 3000");
});