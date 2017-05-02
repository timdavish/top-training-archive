/**
 * Events mongoose models
 * @member {Event} Uses EventSchema
 */
'use strict';

// Module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var EventSchema = new Schema({
    title: String,
    sport: String,
    description: String,
    slots: { type: Number, default: 1 },
    slotsTaken: { type: Number, default: 0 },
    startsAt: Date,
    endsAt: Date,
    trainer: { type: ObjectId, ref: 'User' },
    clients: [{ type: ObjectId, ref: 'User' }],
    archived: { type: Boolean, default: false }
});

// Set mongoose model
mongoose.model('Event', EventSchema);
