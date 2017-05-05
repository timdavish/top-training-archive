/**
 * Sports mongoose models
 * @member {Sport} Uses SportSchema
 */
'use strict';

// Module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * @name SportSchema
 * @desc Defines sport schema
 */
var SportSchema = new Schema({
    sport: {
        type: String,
        required: true,
		unique: true
    },
	data: {
		created: { // Sport creation date
            type: Date,
            default: Date.now
        },
	},
	trainers: [{
		type: ObjectId,
		ref: 'User'
	}]
});

// Find a sport by name
SportSchema.statics.findByName = function(name) {
	return this.find({ 'sport': new RegExp(name, 'i') });
};

// Set mongoose model
mongoose.model('Sport', SportSchema);
