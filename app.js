var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
const session = require('express-session');

const middleware = require('./src/app/Middleware/auth.middleware');


var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

app.use(session({
  secret: 'keyboardcat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    // maxAge: 10 * 60 *1000
   }
}))

app.use(bodyParser.urlencoded({ extended: false }))

// view engine setup
app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'ejs');
app.use(ejsLayouts); // Sử dụng express-ejs-layouts

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// kiểm tra login xl header
app.use(middleware.logged);

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
