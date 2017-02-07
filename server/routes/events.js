
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

// (GET) Get all unarchived events
router.get('/getEvents', function(req, res, next) {
    Event.find(function(err, events) {
        if (err) { return next(err); }

        res.json(events);
    });
});

// (GET) Get all events grouped and sorted high->low by sport
router.get('/getEventsBySport', function(req, res, next) {
    Event.aggregate([
        { $facet: {
            personal: [
                { $match: { // Where
                    slots: 1, // Exactly 1 slot
                    archived: false // Not archived
                }},
                { $group: { // Group
                    _id: { $toLower: "$sport" }, // By sport
                    count: { $sum: 1 }, // Keep a count
                    events: { $push: "$$ROOT" } // Keep all event data
                }},
                { $sort : { // Sort
                    count: -1, // Descending, count
                    _id: 1 // Alphabetically, sport
                }}
            ],
            group: [
                { $match: { // Where
                    slots: { $gt: 1 }, // Greater than 1 slot
                    archived: false // Not archived
                }},
                { $group: { // Group
                    _id: { $toLower: "$sport" }, // By sport
                    count: { $sum: 1 }, // Keep a count
                    events: { $push: "$$ROOT" } // Keep all event data
                }},
                { $sort : { // Sort
                    count: -1, // Descending, count
                    _id: 1 // Alphabetically, sport
                }}
            ]
        }}
    ], function(err, events) {
        if (err) return next(err);

        res.json(events);
    });
});

// (GET) Get all events grouped and sorted high->low by sport
router.get('/getEventsBySport2', function(req, res, next) {
    Event.aggregate([
        { $match: { // Where
            archived: false // Not archived
        }},
        { $group: { // Group
            _id: { $toLower: "$sport" }, // By sport
            count: { $sum: 1 }, // Keep a count/sport

            eventId: { $first: '$_id' }
        }},
        { $facet: {
            personal: [
                { $match: { // Where
                    slots: 1 // Exactly 1 slot
                    // archived: false // Not archived
                }}
                ,
                { $group: { // Group
                    _id: null, //
                    count: { $sum: 1 }, // Keep a count
                    events: { $push: "$$ROOT" } // Keep all event data
                }},
                { $sort : { // Sort
                    count: -1, // Descending, count
                    _id: 1 // Alphabetically, sport
                }}
            ],
            group: [
                { $match: { // Where
                    slots: { $gt: 1 }, // Greater than 1 slot
                    archived: false // Not archived
                }}
                // ,
                // { $group: { // Group
                //     _id: { $toLower: "$sport" }, // By sport
                //     count: { $sum: 1 }, // Keep a count
                //     events: { $push: "$$ROOT" } // Keep all event data
                // }},
                // { $sort : { // Sort
                //     count: -1, // Descending, count
                //     _id: 1 // Alphabetically, sport
                // }}
            ]
        }}
    ], function(err, events) {
        if (err) return next(err);

        res.json(events);
    });
});

// (GET) Get a single event by id
router.get('/getEvent/:event', function(req, res) {
    req.event.populate('students', function(err, event) {
        if (err) { return next(err); }

        res.json(event);
    });
});

// (PUT) Sign up a student for an event
router.put('/signUpEvent/:event/:user', auth, function(req, res, next) {
    // Ensure the user hasn't already signed up for this event
    if (req.event.students.indexOf(req.user._id) != -1) {
        return res.status(400).json({ message: 'You are already signed up for this event.' });
    }

    // Ensure there is a slot left
    if (req.event.slotsTaken >= req.event.slots) {
        return res.status(400).json({ message: 'There are no slots available for this event.' });
    }

    req.event.students.push(req.user);
    req.event.slotsTaken++;
    req.event.save(function(err, event) {
        if (err) { return next(err); }

        req.user.events.push(event);
        req.user.save(function(err, user) {
            if (err) { return next(err); }

            res.json(user);
        });
    });
});

// (PUT) Archive or unarchive an event
router.put('/archiveEvent/:event/', auth, function(req, res, next) {
    req.event.archived = !req.event.archived;
    req.event.save(function(err, event) {
        if (err) { return next(err); }

        res.json(event);
    });
});

// Export the router
module.exports = router;
