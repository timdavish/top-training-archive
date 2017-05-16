/**
 * Package mongoose schema
 */
'use strict';

// Module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PackageSchemaOptions = { _id : false };

/**
 * @name PackageSchema
 * @desc Defines package schema
 */
var PackageSchema = new Schema({
    type: {
        type: String,
		enum: ['private', 'small', 'large'],
        required: true,
		lowercase: true
    },
	sessions: {
		type: Number,
		enum: [1, 2, 5, 10],
		default: 1,
		required: true
	},
	length: {
		type: String,
		default: '1 hour',
		required: true,
		lowercase: true
	},
	price: { // Total
		type: Number,
		default: 0,
		required: true
	}
}, PackageSchemaOptions);

// Export the schema
module.exports = PackageSchema;
