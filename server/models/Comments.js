
var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    body: String,
    author: String,
    upvotes: {type: Number, default: 0},
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

CommentSchema.methods.upvote = function(callback) {
    this.upvotes += 1;
    this.save(callback);
};

// Set mongoose model
mongoose.model('Comment', CommentSchema);
