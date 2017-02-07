
// Module dependencies
var express = require('express');
var passport = require('passport'); // Password authentication

// Database interaction
var mongoose = require('mongoose');
var User = mongoose.model('User'); // Users model

// Router initialization
var router = express.Router();

// (PARAM) Route for preloading user objects
router.param('user', function(req, res, next, id) {
    var query = User.findById(id);

    query.exec(function(err, user) {
        if (err) { return next(err); }
        if (!user) { return next(new Error('Can\'t find the user you are looking for.')); }

        req.user = user;
        return next();
    });
});

// (POST) New user sign up
router.post('/signUp', function(req, res, next) {
    // Ensure all fields are filled out
    if (!req.body.email || !req.body.password || !req.body.usertype) {
        return res.status(400).json({ message: 'Please fill out all fields.' });
    }

    // Create a new user and set their email and password
    var user = new User();
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.usertype = req.body.usertype;

    // Save the user in the database
    user.save(function(err) {
        if (err) { return next(err); }

        return res.json({ token: user.generateJWT() });
    });
});

// (POST) User login
router.post('/login', function(req, res, next) {
    // Ensure all fields are filled out
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Please fill out all fields.' });
    }

    // Authenticate user login
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            return res.status(401).json(info);
        } else {
            return res.json({ token: user.generateJWT() });
        }
    })(req, res, next);
});

// (GET) Get a single user by id
router.get('/:user', function(req, res) {
    res.json(req.post);
});

// Export the router
module.exports = router;
