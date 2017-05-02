/**
 * Sports mongoose models
 * @member {Sport} Uses SportSchema
 */
'use strict';

// Module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var SportSchema = new Schema({
    sport: {
        type: String,
		enum: ['Basketball', 'Baseball', 'Cross Training'],
        required: true,
		unique: true
    },
	data: {
		created: { // Sport creation date
            type: Date,
            default: Date.now
        },
	},
	/* This is just an idea */
	trainers: [{
		type: ObjectId,
		ref: 'User'
	}]
});

// Set mongoose model
mongoose.model('Sport', SportSchema);
