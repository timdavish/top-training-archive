/**
 * Locations mongoose models
 * @member {Location} Uses LocationSchema
 */
'use strict';

// Module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * @name LocationSchema
 * @desc Defines location schema
 */
var LocationSchema = new Schema({
	type: {
		type: String,
		enum: 'Point',
		default: 'Point',
		required: true
	},
	coordinates: {
		type: [Number],
		default: [-122.3, 47.6],
		required: true
	}
});

mongoose.model('Location', LocationSchema);
