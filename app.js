const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const flash = require('express-flash');
const methodOverride = require('method-override');
const User = require('./models/user');

const app = express();

// MongoDB - Mongoose Setup
const MONGO_URL =
  process.env.DATABASEURL || 'mongodb://127.0.0.1:27017/twitter-clone';
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL, {
  useCreateIndex: true,
  useNewUrlParser: true
});
mongoose.connection.on('error', err => {
  throw err;
});

// Requiring Routes
const indexRoutes = require('./routes/index');
const profileRoutes = require('./routes/profile');
const tweetRoutes = require('./routes/tweet');
const exploreRoutes = require('./routes/explore');
const userRoutes = require('./routes/user');

// Sessions
app.use(
  session({
    secret: 'Esto es secreto',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      url: MONGO_URL,
      autoReconnect: true
    })
  })
);

// Passport
app.use(passport.initialize()); // initialize passport
app.use(passport.session()); // initialize passport session
passport.use(User.createStrategy()); // tell passport to use a new local-strategy from the User model
passport.serializeUser(User.serializeUser()); // responsable for reading the data from the session that's un-encoded to encoded it
passport.deserializeUser(User.deserializeUser()); // responsable for reading the data from the session that's encoded to un-encoded it

// Body Parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Flash Messages
app.use(flash());
// Method Override
app.use(methodOverride('_method'));

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Static Files
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(
  '/css',
  express.static(
    path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')
  )
);
app.use(
  '/js',
  express.static(
    path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')
  )
);
app.use(
  '/js',
  express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist'))
);

// Local Variables
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use('/', indexRoutes);
app.use('/', userRoutes);
app.use('/explore', exploreRoutes);
app.use('/tweet', tweetRoutes);
app.use('/profile', profileRoutes);

// Server Listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, process.env.IP, () => {
  console.log(`Server Listening on PORT ${PORT}`);
});
