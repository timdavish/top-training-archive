
// Module dependencies
var express = require('express');

// Database interaction
var mongoose = require('mongoose');
var User = mongoose.model('User'); // Users model
var Event = mongoose.model('Event'); // Events model

// Session token authentication
var jwt = require('express-jwt');
var auth = jwt({ secret: 'SECRET', userProperty: 'payload' });
// CHANGE 'SECRET' (here and in Users.js) TO REFERENCE AN ENVIRONMENT VARIABLE OUTSIDE OF CODEBASE

// Router initialization
var router = express.Router();

// (PARAM) Route for preloading event objects
router.param('event', function(req, res, next, id) {
    var query = Event.findById(id);

    query.exec(function(err, event) {
        if (err) { return next(err); }
        if (!event) { return next(new Error('Can\'t find the event you are looking for.')); }

        req.event = event;
        return next();
    });
});

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

// (POST) Create a new event
router.post('/addEvent/:user', auth, function(req, res, next) {
    var event = new Event(req.body);

    event.save(function(err, event) {
        if (err) { return next(err); }

        req.user.events.push(event);
        req.user.save(function(err, user) {
            if (err) { return next(err); }

            res.json(event);
        });
    });
});

// (GET) Get all events
router.get('/getEvents', function(req, res, next) {
    Event.find(function(err, events) {
        if (err) { return next(err); }

        res.json(events);
    });
});

// (GET) Get a single event by id
router.get('/getEvent/:event', function(req, res) {
    res.json(req.event);
});

// Export the router
module.exports = router;
