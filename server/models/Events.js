
var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    title: String,
    sport: String,
    description: String,
    slots: { type: Number, default: 1 },
    slotsTaken: { type: Number, default: 0 },
    startsAt: Date,
    endsAt: Date,
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    archived: { type: Boolean, default: false }
});

// Set mongoose model
mongoose.model('Event', EventSchema);
