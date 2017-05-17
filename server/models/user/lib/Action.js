/**
 * Action mongoose schema
 */
'use strict';

// Module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * @name ActionSchema
 * @desc Defines action schema
 */
var ActionSchema = new Schema({
	admin: {
		type: ObjectId,
		ref: 'User',
		required: true
	},
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    message: {
        type: String,
        default: '',
        required: true
    }
});

// Export the schema
module.exports = ActionSchema;
