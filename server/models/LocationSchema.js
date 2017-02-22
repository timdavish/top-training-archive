var mongoose = require('mongoose');

var locationSchema =  new mongoose.Schema({
        owner:{  type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
        },
        type: {
            type: String,
            enum: 'Point',
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: [-122.3, 47.6]
        }
});
mongoose.model('Location', locationSchema);
