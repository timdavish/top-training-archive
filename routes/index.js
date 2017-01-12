
// Module dependencies
var express = require('express');
var passport = require('passport'); // Password authentication

// Database interaction
var mongoose = require('mongoose');
var User = mongoose.model('User'); // Users model
var Post = mongoose.model('Post'); // Posts model
var Comment = mongoose.model('Comment'); // Comments model

// Session token authentication
var jwt = require('express-jwt');
var auth = jwt({ secret: 'SECRET', userProperty: 'payload' });
// CHANGE 'SECRET' (here and in Users.js) TO REFERENCE AN ENVIRONMENT VARIABLE OUTSIDE OF CODEBASE

// Router initialization
var router = express.Router();

// (GET) Render our home page
router.get('/', function(req, res, next) {
  res.render('pages/index');
});

// (PARAM) Route for preloading post objects
router.param('post', function(req, res, next, id) {
    var query = Post.findById(id);

    query.exec(function(err, post) {
        if (err) { return next(err); }
        if (!post) { return next(new Error('Can\'t find the post you are looking for.')); }

        req.post = post;
        return next();
    });
});

// (PARAM) Route for preloading comment objects
router.param('comment', function(req, res, next, id) {
    var query = Comment.findById(id);

    query.exec(function(err, comment) {
        if (err) { return next(err); }
        if (!comment) { return next(new Error('Can\'t find the comment you are looking for.')); }

        req.comment = comment;
        return next();
    });
});

// (POST) Create a new post
router.post('/posts', auth, function(req, res, next) {
    var post = new Post(req.body);
    post.author = req.payload.username;

    post.save(function(err, post) {
        if (err) { return next(err); }

        res.json(post);
    });
});

// (GET) Get all posts
router.get('/posts', function(req, res, next) {
    Post.find(function(err, posts) {
        if (err) { return next(err); }

        res.json(posts);
    });
});

// (GET) Get a single post by id
router.get('/posts/:post', function(req, res) {
    req.post.populate('comments', function(err, post) {
        if (err) { return next(err); }

        res.json(post);
    });
});

// (PUT) Upvote a post
router.put('/posts/:post/upvote', auth, function(req, res, next) {
    req.post.upvote(function(err, post) {
        if (err) { return next(err); }

        res.json(post);
    });
});

// (POST) Create a new comment on a post
router.post('/posts/:post/comments', auth, function(req, res, next) {
    var comment = new Comment(req.body);
    comment.post = req.post;
    comment.author = req.payload.username;

    comment.save(function(err, comment) {
        if (err) { return next(err); }

        req.post.comments.push(comment);
        req.post.save(function(err, post) {
            if (err) { return next(err); }

            res.json(comment);
        });
    });
});

// (PUT) Upvote a comment
router.put('/posts/:post/comments/:comment/upvote', auth, function(req, res, next) {
    req.comment.upvote(function(err, comment) {
        if (err) { return next(err); }

        res.json(comment);
    });
});

// (POST) User registration
router.post('/register', function(req, res, next) {
    // Ensure all fields are filled out
    if (!req.body.username || !req.body.password || !req.body.usertype) {
        return res.status(400).json({ message: 'Please fill out all fields.' });
    }

    // Create a new user and set their username and password
    var user = new User();
    user.username = req.body.username;
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
    if (!req.body.username || !req.body.password) {
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

module.exports = router;
