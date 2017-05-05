/**
 * TrainerProfile mongoose schema
 */
'use strict';

// Module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrainerProfileSchemaOptions = { _id : false };

/**
 * @name TrainerProfileSchema
 * @desc Defines trainer profile schema
 */
var TrainerProfileSchema = new Schema({
	rating: {
		type: Number,
		default: 0
	},
	summary: {
		type: String,
		default: 'Trainer summary'
	},
	credentials: {
		experience: {
			type: Number,
			default: 0
		},
		school: {
			type: String,
			default: 'College/University'
		}
	},
	services: {
		ages: [{
			type: String,
			default: 'Kids'
		}],
		positions: [{
			type: String,
			default: 'Position'
		}],
		specialties: [{
			type: String,
			default: 'Specialty'
		}]
	}
}, TrainerProfileSchemaOptions);

// Export the schema
module.exports = TrainerProfileSchema;
