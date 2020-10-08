const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const socket = require('socket.io');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');

const app = express();

/*Filter Server and Require for Socket io*/
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => { console.log(`App running on port ${PORT}`) })
const io = socket(server);

//use session


app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

//ดึง controller มาใช้
const shopsRouter = require('./routes/shopsController');
const orderListRouter = require('./routes/orderListController');
const inboxRouter = require('./routes/inboxController');
const chatRouter = require('./routes/chatController');
const editProfileRouter = require('./routes/editProfileController');
const cartRouter = require('./routes/cartController');
const orderSenderRouter = require('./routes/orderSenderController');
const inboxSenderRouter = require('./routes/inboxSenderController');
const chatSenderRouter = require('./routes/chatSenderController');
const homeSenderRouter = require('./routes/homeSenderController');


//กำหนดตัวแปรให้ controller
app.use('/shops', shopsRouter);
app.use('/orderList', orderListRouter);
app.use('/inbox', inboxRouter);
app.use('/chat', chatRouter);
app.use('/editProfile', editProfileRouter);
app.use('/cart', cartRouter);
app.use('/orderSender', orderSenderRouter);
app.use('/inboxSender', inboxSenderRouter);
app.use('/chatSender', chatSenderRouter);
app.use('/sender', homeSenderRouter);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// error handler
app.use(async function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('500error');
});


/* login */

app.get('/', function (req, res) {
  res.render('login');
});


let userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.get('/profile', (req, res) => {
  res.render('profile', { user: userProfile });
  console.log(userProfile);
});
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});


/*  Google AUTH  */


const GOOGLE_CLIENT_ID = '208922727243-chcjrc4uu520omqom1csgobhagoli40i.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'clU0mrAKbXhmzPl2ONsu1S3q';

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "https://chernsavoey.herokuapp.com/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {
    userProfile = profile;
    return done(null, userProfile);
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/error' }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect('/shops');
  });

//socket.io
app.get('/mockupChat', (req, res) => {
  res.render('index');
});

// Initialize socket for the server
io.on("connection", socket => {
  console.log("New user connected");

  socket.username = "Anonymous"

  socket.on("change_username", data => {
    socket.username = data.username
  })

  // handle the new message event
  socket.on("new_message", data => {
    console.log("new messsage" + data.message + ' '+ socket.username);
    io.sockets.emit("receive_message", { message: data.message, username: socket.username })
  })

  socket.on('typing', data => {
    socket.broadcast.emit('typing', { username: socket.username })
  })
});


// route for logging out
app.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    req.logout();
    res.redirect('/');
  });
});


module.exports = app;
