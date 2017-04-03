
// Module dependencies
var express = require('express');

// Node mailer
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'timdavish@gmail.com',
		pass: 'timmyk123e123e'
	}
});

// Router initialization
var router = express.Router();

// (POST) Send a contact request
router.post('/sendRequest', function(req, res, next) {
	var data = req.body;

	transporter.sendMail({
		from: data.email,
		to: 'timdavish@gmail.com',
		replyTo: data.email,
		subject: 'Support message: ' + data.subject,
		text: data.content
	}, function(err) {
		if (err) { return next(err); }
	});

	res.json(data);
});

// Export the router
module.exports = router;
