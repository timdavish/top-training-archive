
// Module dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Database setup and connection
var mongoose = require('mongoose');
require('./models/Users'); // Users model
require('./models/Reviews'); // Reviews model
require('./models/Events'); // Events model
require('./models/Posts'); // Posts model
require('./models/Comments'); // Comments model
mongoose.Promise = global.Promise; // Adjust mongoose promise
mongoose.connect('mongodb://localhost/TT');

// Password authentication
var passport = require('passport');
require('./config/passport'); // Passport configuration

// App initialization
var app = express();

// View engine setup
app.set('views', path.join(__dirname, './../client'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// Other app setup
//app.use(favicon(path.join(__dirname, 'client/images/', 'favicon.ico'))); // uncomment after placing your favicon in /public/images
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../'))); // Set our public folder
app.use(passport.initialize()); // Use passport in our app

// API routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/events', require('./routes/events'));
app.use('/posts', require('./routes/posts'));
app.use('/support', require('./routes/support'));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use(function(err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render('app/modules/layout/error.html');
});

module.exports = app;
