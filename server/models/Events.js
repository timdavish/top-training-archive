
var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    title: String,
    body: String,
    date: Date,
    slots: { type: Number, default: 1 },
    slotsTaken: { type: Number, default: 0 },
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    archived: { type: Boolean, default: false }
});

// Set mongoose model
mongoose.model('Event', EventSchema);
