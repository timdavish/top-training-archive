
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
router.post('/getTrainers', function(req, res, next) {
    var params = req.body;
    params.sport = params.sport.toLowerCase();

    User.aggregate([
        { $geoNear: { // calculates and sorts by distance
            query: {
                usertype: 'trainer', // trainers only
                'trainerInfo.sports': params.sport // trainers who train this sport only
            },
            near: {
                type: 'Point', // 2dsphere
                coordinates: [params.long, params.lat] // long, lat coordinates to start search at
            },
            maxDistance: 1000 * 1.609 * 1000, // m = miles * 1.609 km/mile * 1000 m/km
            distanceMultiplier: 1 * 0.621 * 0.001, // miles = m * 0.621 mile/km * 0.001 km/m
            distanceField: 'dist.calculated', // field to assign distance result
            includeLocs: 'dist.location', // field to assign location result
            limit: 10, // limit
            spherical: true // 2dsphere calculations
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
