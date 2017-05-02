/**
 * Comments mongoose models
 * @member {Comment} Uses CommentSchema
 */
'use strict';

// Module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var CommentSchema = new Schema({
    body: String,
    author: String,
    upvotes: {type: Number, default: 0},
    post: { type: ObjectId, ref: 'Post' }
});

CommentSchema.methods.upvote = function(callback) {
    this.upvotes += 1;
    this.save(callback);
};

// Set mongoose model
mongoose.model('Comment', CommentSchema);
