var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//ดึง controller มาใช้
var indexRouter = require('./routes/indexController');
var usersRouter = require('./routes/usersController');
var shopsRouter = require('./routes/shopsController');
var menuRouter = require('./routes/menusController');
var orderListRouter = require('./routes/orderListController');
var inboxRouter = require('./routes/inboxController');
var chatRouter = require('./routes/chatController');
var profileRouter = require('./routes/profileController');
var editProfileRouter = require('./routes/editProfileController');
var cartRouter = require('./routes/cartController');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//กำหนดตัวแปรให้ controller
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shops', shopsRouter);
app.use('/menus', menuRouter);
app.use('/orderList', orderListRouter);
app.use('/inbox', inboxRouter);
app.use('/chat', chatRouter);
app.use('/profile', profileRouter);
app.use('/editProfile', editProfileRouter);
app.use('/cart', cartRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
