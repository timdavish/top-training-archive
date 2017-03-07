var mongoose = require('mongoose');
//Static Vars
exports.EventType = 'event';
exports.PackageType = 'package';
exports.NoType = 'none';
exports.ProductTypeEnum = [exports.EventType, exports.PackageType, exports.NoType];
//Schema
var ProductSchema = new mongoose.Schema({
    owner: { //Trainer
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sport: {
        type: String
    },
    limit: {
        type: Number,
        //enum: [0, 1, 2, 5, 10,20,30],
        default: 1
    },
    price: {
        type: Number
    },
    expireDate: {
        type: Date
    },
    type: {
        type: String,
        enum: exports.ProductTypeEnum,
        required: true
    },
    receipts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductReceipt'
    }]
});

ProductSchema.methods.AddReceipt = function(conf, cb) {
    var num = this.receipts.length;
    if (num < this.limit) {
        var rec = mongoose.model('ProductReceipt');
        rec.owner = conf.owner;
        rec.product = this._id;
        rec.purchaseDate = new Date();
        rec.expireDate = this.expireDate;
        rec.type = conf.type || exports.NoType;
        receipts.push(rec);
        this.save(cb);
    }
}
mongoose.model('Product', ProductSchema);