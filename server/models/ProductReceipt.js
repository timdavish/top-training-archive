//Add Product Reciepts
var mongoose = require('mongoose');

var ProductReceiptSchema = new mongoose.Schema({
    owner: { //Trainer
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    expireDate: {
        type: Date,
        default: Date.now
    },
    recieptNum: {
        type: Number
    }
});
mongoose.model('ProductReceipt', ProductReceiptSchema)