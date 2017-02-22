var mongoose = require('mongoose');
//Static Vars
exports.EventType = 'event';
exports.PackageType = 'package';
exports.NoType = 'none';
exports.ProductTypeEnum =
[exports.EventType,exports.PackageType,exports.NoType];
//Schema
var ProductSchema = new mongoose.Schema({
    owner: { //Trainer
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sport: {
        type: String
    },
    count: {
        type: Number,
        enum: [1, 2, 5, 10],
        default: 1
    },
    price: {
        type: Number
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    expireDate: {
        type: Date
    },
    type:{
        type: String,
        enum:ProductTypeEnum,
        required: true
    }
});

mongoose.model('Product',ProductSchema);
