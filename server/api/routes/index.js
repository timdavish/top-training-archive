
// Module dependencies
var express = require('express');

// Router initialization
var router = express.Router();

// (GET) Render our shell with default home page
router.get('/', function(req, res, next) {
    res.render('index.html');
});

// Export the router
module.exports = router;
