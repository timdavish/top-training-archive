/**
 * Users mongoose models
 * @member {User} Uses UserSchema
 * @member {Admin} Uses AdminSchema, built on UserSchema
 * @member {Client} Uses ClientSchema, built on UserSchema
 * @member {Trainer} Uses TrainerSchema, built on UserSchema
 */
'use strict';

// Module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var crypto = require('crypto'); // Used for generating password hash
var jwt = require('jsonwebtoken'); // Used for generating tokens

// Embedded documents
var Action = require('./lib/Action');
var Location = require('./lib/Location');
var Package = require('./lib/Package');
var Review = require('./lib/Review');
var TrainerProfile = require('./lib/TrainerProfile');

var UserSchemaOptions = { discriminatorKey: 'usertype' }; // Used for different user types

/**
 * @name UserSchema
 * @desc Defines general user schema, all users have this data
 */
var UserSchema = new Schema({
    contact: {
        email: { // Email
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        phone: { // Phone number
            type: Number
        },
        firstname: { // First name
            type: String
        },
        lastname: { // Last name
            type: String
        }
    },
    accounts: {
        local: { // Local login
            hash: String,
            salt: String
        },
        facebook: { } // Facebook login
    },
    data: {
        created: { // Account creation date
            type: Date,
            default: Date.now
        },
        lastActive: { // Last active date
            type: Date,
            default: Date.now
        }
    }
}, UserSchemaOptions);

/**
 * @name AdminSchema
 * @desc Defines admin user schema, only admins have this data
 */
var AdminSchema = new Schema({
	actions: [Action]
});

/**
 * @name ClientSchema
 * @desc Defines client user schema, only clients have this data
 */
var ClientSchema = new Schema({
	activeSessions: [{
		trainer: {
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
		}
	}],
	activeEvents: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Event'
	}],
	activeTrainers: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	savedTrainers: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	zipcode: Number,
	events: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Event'
	}]
	// profiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }]
});

/**
 * @name TrainerSchema
 * @desc Defines trainer user schema, only trainers have this data
 */
var TrainerSchema = new Schema({
	approved: {
		type: Boolean,
		required: true,
		default: false
	},
	sports: [{
		_id: false,
		sport: {
			type: String,
			required: true,
			lowercase: true
		},
		profile: TrainerProfile,
		locations: [Location],
		packages: [Package],
		events: [{ type: ObjectId, ref: 'Event' }]
	}],
	rating: {
		average: {
			type: Number,
			default: 0,
			required: true
		},
		count: {
			type: Number,
			default: 0,
			required: true
		},
		reviews: [Review]
	}
});

// Index our searchable locations
TrainerSchema.index({"sports.locations.geometry": "2dsphere"});

// Find a user by email
UserSchema.statics.findByEmail = function(email) {
	return this.find({ 'contact.email': new RegExp(email, 'i') });
};

// Set a hashed password using a crypto salt
UserSchema.methods.setPassword = function(password) {
    this.accounts.local.salt = crypto.randomBytes(16).toString('hex');
    this.accounts.local.hash = crypto.pbkdf2Sync(password, this.accounts.local.salt, 1000, 64, 'sha1').toString('hex');
};

// Validate a password using the crypto salt
UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.accounts.local.salt, 1000, 64, 'sha1').toString('hex');
    return this.accounts.local.hash === hash;
};

// Generate a token
UserSchema.methods.generateJWT = function() {
    // Set token experation (1 day)
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 1);

    var secret = 'SECRET';
    // CHANGE THIS TO REFERENCE AN ENVIRONMENT VARIABLE OUTSIDE OF CODEBASE

    return jwt.sign({
        user: this,
        exp: parseInt(exp.getTime() / 1000)
    }, secret);
};

// Switch a trainer's approval
TrainerSchema.methods.flipApproved = function(callback) {
	this.approved = !this.approved;
	this.save(callback);
};

// Set mongoose models
var User = mongoose.model('User', UserSchema);
User.discriminator('Admin', AdminSchema);
User.discriminator('Client', ClientSchema);
User.discriminator('Trainer', TrainerSchema);
