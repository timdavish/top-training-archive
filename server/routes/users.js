
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

    // Create a new user and set their initial properties
    var user = new User();
    user.usertype = req.body.usertype;
    user.contact.email = req.body.email;
    user.contact.firstname = req.body.firstname;
    user.contact.lastname = req.body.lastname;
    user.setPassword(req.body.password);

    // Fill in specific usertype info
    if (user.usertype === 'client') {
        user.clientInfo.zipcode = req.body.zipcode;
    } else if (user.usertype === 'trainer') {

    }

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

// (GET) Get trainers
router.get('/getTrainers', function(req, res, next) {
    User.aggregate([
        { $match: {
            usertype: 'trainer'
        }}
    ], function(err, trainers) {
        if (err) { return next(err); }
        res.json(trainers);
    });
});

// (GET) Get a single user by id
router.get('/:user', function(req, res) {
    res.json(req.user);
});

// Export the router
module.exports = router;
