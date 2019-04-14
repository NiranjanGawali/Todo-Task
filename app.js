var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
var expressValidator = require('express-validator');
var cors = require('cors');


mongoose.connect(config.MONGO_URI, { promiseLibrary: require('bluebird'),useNewUrlParser: true  })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressValidator());

app.use(express.static(path.join(__dirname, 'public')));

var usersRouter = require('./routes/userManagementController/user_controller');
var todoRouter = require('./routes/todoManagementController/todo_controller');


app.use('/', usersRouter);
app.use('/', todoRouter);




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

String.prototype.toObjectId = function () {
  var ObjectId = (require('mongoose').Types.ObjectId);
  return new ObjectId(this.toString());
};

module.exports = app;
