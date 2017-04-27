
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SportSchema = new Schema({
    sport: {
        type: String,
		enum: ['Basketball', 'Baseball', 'Cross Training'],
        ref: 'User',
        required: true
    },
	date: {
		type: Date,
		default: Date.now
	},
	/* This is just an idea */
	trainers: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}]
});

// Set mongoose model
mongoose.model('Sport', SportSchema);
