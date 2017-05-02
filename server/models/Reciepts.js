/**
 * Reciepts mongoose models
 * @member {Reciept} Uses RecieptSchema
 */
'use strict';

// Module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * @name RecieptSchema
 * @desc Defines reciept schema
 */
var RecieptSchema = new Schema({
	client: {
		type: ObjectId,
		ref: 'Client',
		required: true
	},
	trainer: {
		type: ObjectId,
		ref: 'Trainer',
		required: true
	},
	total: {
		type: Number,
		required: true
	},
	purchases: {
		package: {}
	},
	created: { // Sport creation date
        type: Date,
        default: Date.now
    }
});

mongoose.model('Reciept', RecieptSchema);
