
var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        default: 5,
        required: true
    },
    content: {
        type: String,
        default: '',
        required: true
    },
    type: {
        type: String,
        enum: ['Verified Purchase', 'Client', 'Testimonial'],
        default: 'Client',
        required: true
    }
});

// Set mongoose model
mongoose.model('Review', ReviewSchema);
