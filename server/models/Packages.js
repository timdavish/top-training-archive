/**
 * Packages mongoose models
 * @member {Package} Uses PackageSchema
 */
'use strict';

// Module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PackageSchema = new Schema({
    type: {
        type: String,
		enum: ['individual', 'small', 'group'],
        required: true,
		lowercase: true
    },
	sessions: {
		type: Number,
		enum: [1, 2, 5, 10],
		default: 1,
		required: true
	},
	price: { // Total
		type: Number,
		default: 0,
		required: true
	}
});

// Set mongoose model
mongoose.model('Package', PackageSchema);
