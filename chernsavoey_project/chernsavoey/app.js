var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//ดึง controller มาใช้
var indexRouter = require('./routes/loginController');
var usersRouter = require('./routes/usersController');
var shopsRouter = require('./routes/shopsController');
var menuRouter = require('./routes/menusController');
var orderListRouter = require('./routes/orderListController');
var inboxRouter = require('./routes/inboxController');
var chatRouter = require('./routes/chatController');
var profileRouter = require('./routes/profileController');
var editProfileRouter = require('./routes/editProfileController');
var cartRouter = require('./routes/cartController');
var orderSenderRouter = require('./routes/orderSenderController');
var inboxSenderRouter = require('./routes/inboxSenderController');
var chatSenderRouter = require('./routes/chatSenderController');
var homeSenderRouter = require('./routes/homeSenderController');


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
app.use('/menus', menuRouter);
app.use('/orderList', orderListRouter);
app.use('/inbox', inboxRouter);
app.use('/chat', chatRouter);
app.use('/profile', profileRouter);
app.use('/cart', cartRouter);
app.use('/orderSender', orderSenderRouter);
app.use('/inboxSender', inboxSenderRouter);
app.use('/chatSender', chatSenderRouter);
app.use('/homeSender', homeSenderRouter);




// catch 404 and 500 forward to error handler
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
  res.render('500error');
});

module.exports = app;
