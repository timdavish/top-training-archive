/**
 * Location mongoose schema
 */
'use strict';

// Module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchemaOptions = { _id : false };

/**
 * @name LocationSchema
 * @desc Defines location schema
 */
var LocationSchema = new Schema({
	priority: {
		type: Number,
		default: 1
	},
	formatted_address: {
		type: String
	},
	geometry: {
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
	}
}, LocationSchemaOptions);

// Export the schema
module.exports = LocationSchema;
