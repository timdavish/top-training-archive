/**
 * Posts mongoose models
 * @member {Post} Uses PostSchema
 */
'use strict';

// Module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var PostSchema = new Schema({
    title: String,
    link: String,
    upvotes: { type: Number, default: 0 },
    comments: [{ type: ObjectId, ref: 'Comment' }]
});

PostSchema.methods.upvote = function(callback) {
    this.upvotes += 1;
    this.save(callback);
};

// Set mongoose model
mongoose.model('Post', PostSchema);
