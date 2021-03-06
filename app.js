var createError = require('http-errors');
var express = require('express');
var path = require('path');  
var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var csrf = require('csurf');
var session = require('express-session');
var flash = require('connect-flash');
var logger = require('morgan');

// setup route middlewares
// var csrfProtection = csrf({ cookie: true })
// var parseForm = bodyParser.urlencoded({ extended: false })

var indexRouter = require('./routes/index');
var menu = require('./routes/menu')
var login = require('./routes/login')
var signin = require('./routes/signin')

var app = express();
var engine = require('ejs-locals');
app.engine('ejs', engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'kotard',
  resave: true,
  saveUninitialized: true,
}));
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/menu', menu);
app.use('/signin', signin);
app.use('/login', login);

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
