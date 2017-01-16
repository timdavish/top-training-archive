
// Module dependencies
var express = require('express');

// Database interaction
var mongoose = require('mongoose');
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

// Export the router
module.exports = router;
