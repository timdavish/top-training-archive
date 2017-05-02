/**
 * Users mongoose models
 * @member {User} Uses UserSchema
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
var options = { discriminatorKey: 'kind' }; // Used for different user types

// Define the general user schema
var UserSchema = new Schema({
    usertype: { // All users have this data
        type: String,
        enum: ['admin', 'client', 'trainer'],
        required: true,
        lowercase: true
    },
    contact: { // All users have this data
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
    accounts: { // All users have this data
        local: { // Local login
            hash: String,
            salt: String
        },
        facebook: { } // Facebook login
    },
    data: { // All users have this data
        created: { // Account creation date
            type: Date,
            default: Date.now
        },
        lastActive: { // Last active date
            type: Date,
            default: Date.now
        }
    }
}, options);

// Define the client user schema
var ClientSchema = new Schema({
	clientInfo: { // Client specific data
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
	}
});

// Define the trainer user schema
var TrainerSchema = new Schema({
	trainerInfo: { // Trainer specific data
		sports: [{ // Each sport requires seperate data set
			sport: { // The sport
				type: ObjectId,
				ref: 'Sport'
			},
			locations: {
				type: ObjectId,
				ref: 'Location'
			},
			packages: [{ // Packages for this sport
				type: ObjectId,
				ref: 'Package'
			}],
			events: [{ // Events for this sport
				type: ObjectId,
				ref: 'Event'
			}],
			summary: { // Page fluff
				type: String,
				default: 'Trainer summary'
			},
			credentials: { // Page fluff
				experience: {
					type: Number,
					default: 0
				},
				school: {
					type: String,
					default: 'College/University'
				}
			},
			services: { // Page fluff
				ages: [{
					type: String,
					default: 'Kids'
				}],
				positions: [{
					type: String,
					default: 'Position'
				}],
				specialties: [{
					type: String,
					default: 'Specialty'
				}]
			}
		}],
		locations: [{ // Training locations
			type: {
				type: String,
				enum: 'Point',
				default: 'Point'
			},
			coordinates: {
				type: [Number],
				default: [-122.3, 47.6]
			}
		}],
		reviews: [{ // Trainer reviews
			type: ObjectId,
			ref: 'Review'
		}]
	}
});

// Index our searchable locations
UserSchema.index({"trainerInfo.locations": "2dsphere"});

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
        _id: this._id,
        usertype: this.usertype,
        contact: this.contact,
        data: this.data,
        clientInfo: this.clientInfo,
        trainerInfo: this.trainerInfo,
        exp: parseInt(exp.getTime() / 1000)
    }, secret);
};

// Set mongoose models
var User = mongoose.model('User', UserSchema);
User.discriminator('Client', ClientSchema);
User.discriminator('Trainer', TrainerSchema);
