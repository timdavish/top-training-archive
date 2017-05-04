
// Module dependencies
var express = require('express');
var passport = require('passport'); // Password authentication

// Database interaction
var mongoose = require('mongoose');
var User = mongoose.model('User'); // User model
var Client = mongoose.model('Client'); // Client model
var Trainer = mongoose.model('Trainer'); // Trainer model
var Sport = mongoose.model('Sport'); // Sport model

// Router initialization
var router = express.Router();

// Constants
var USER_TYPES = {
	ADMIN: 'admin',
	CLIENT: 'client',
	TRAINER: 'trainer'
};

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

// (PARAM) Route for preloading user objects
router.param('email', function(req, res, next, email) {
    var query = User.findByEmail(email);

    query.exec(function(err, user) {
        if (err) { return next(err); }
        if (!user) { return next(new Error('Can\'t find the user you are looking for.')); }

        req.user = user;
        return next();
    });
});

// (POST) New user sign up
router.post('/signUp', function(req, res, next) {
	var userData = req.body;

    // Ensure all fields are filled out
    if (!userData.email || !userData.password || !userData.usertype) {
        return res.status(400).json({ message: 'Please fill out all fields.' });
    }

	var user;

	// Create new user depending on type
	if (userData.usertype === USER_TYPES.ADMIN) {
		// Admin user
		// handleNewAdmin();
	} else if (userData.usertype === USER_TYPES.CLIENT) {
		// Client user
		// handleNewClient();
		user = new Client();

		user.zipcode = userData.zipcode ? userData.zipcode : null;

	} else if (userData.usertype === USER_TYPES.TRAINER) {
		// Trainer user
		handleNewTrainer();
	} else {
		// Unknown user
		return res.status(400).json({ message: 'Something went wrong.' });
	}

    // Set general user initial properties
    user.contact.email = userData.email;
    user.contact.firstname = userData.firstname;
    user.contact.lastname = userData.lastname;
    user.setPassword(userData.password);

    // Save the user in the database
    user.save(function(err) {
        if (err) { return next(err); }

        return res.json({ token: user.generateJWT() });
    });

	function handleNewTrainer() {
		user = new Trainer();

		var sportData = userData.sportData;
		if (sportData) {
			var newSportData = {};

			// Find sport, push trainer on trainers
			Sport.update(
				{ 'sport': sportData.sport },
				{ '$push': {
					"trainers": user
				}},
				function(err, res) {
					if (err) { return next(err); }
					console.log('Sport.update res:', res);
				}
			);

			// Set trainer profile
			var profile = new TrainerProfile(sportData.profile);
			profile.save(function(err, profile) {
				if (err) { return next(err); }
				newSportData.profile = profile;
			});

			user.sports.push(newSportData);
			console.log(user);
			user.save();
		}
	}
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
    var searchParams = req.body;

	// Edit our search params
	searchParams.sport = searchParams.sport.toLowerCase();
	searchParams.lat = parseFloat(searchParams.lat);
	searchParams.long = parseFloat(searchParams.long);
    searchParams.searchDistance = 100; // miles

    Trainer.aggregate([
        { $geoNear: { // calculates and sorts by distance
            query: {
                usertype: 'trainer', // trainers only
                'sports.sport': searchParams.sport // trainers who train this sport only
            },
            near: {
                type: 'Point', // 2dsphere
                coordinates: [ searchParams.long, searchParams.lat ] // long, lat coordinates to start search at
            },
            maxDistance: searchParams.searchDistance * 1.609 * 1000, // m = miles * 1.609 km/mile * 1000 m/km
            distanceMultiplier: 1 * 0.621 * 0.001, // miles = m * 0.621 mile/km * 0.001 km/m
            distanceField: 'dist.calculated', // field to assign distance result
            includeLocs: 'dist.location', // field to assign location result
            limit: 10, // limit
            spherical: true // 2dsphere calculations
        }},
        { $project: { // Choose which data fields make it through
            accounts: 0 // we don't want account (login) info
        }},
        { $group: { // Group
            _id: null, // Don't group by anything
            count: { $sum: 1 }, // Keep a count
            trainers: { $push: "$$ROOT" } // Keep all trainer data
        }},
    ], function(err, trainers) {
        if (err) { return next(err); }

        res.json(trainers);
    });
});

// (GET) Get a single user by id
router.get('/:user', function(req, res) {
    res.json(req.user);
});

// (GET) Get a single user by id
router.get('/getByEmail/:email', function(req, res) {
	res.json(req.user);
});

// Export the router
module.exports = router;
