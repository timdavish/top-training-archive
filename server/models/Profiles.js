/**
 * Profiles mongoose models
 * @member {TrainerProfile} Uses TrainerProfileSchema
 */
'use strict';

// Module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * @name TrainerProfileSchema
 * @desc Defines trainer profile schema
 */
var TrainerProfileSchema = new Schema({
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
});

mongoose.model('TrainerProfile', TrainerProfileSchema);
