
// Module dependencies
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

// Define our passport login authentication strategy
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        User.findOne({ 'contact.email': email }, function(err, user) {
            if (err) { return done(err); }
            // User not found
            if (!user) {
                return done(null, false, {
                    message: 'User not found.'
                });
            }
            // Password incorrect
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            // Success
            return done(null, user);
        });
    }
));
