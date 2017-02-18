
// Module dependencies
var mongoose = require('mongoose');
var crypto = require('crypto'); // Used for generating password hash
var jwt = require('jsonwebtoken'); // Used for generating tokens

// Define the User schema
var UserSchema = new mongoose.Schema({
    // All users have this data
    usertype: {
        type: String,
        enum: ['client', 'trainer', 'admin'],
        required: true,
        lowercase: true
    },
    contact: {
        email: {
            type: String,
            lowercase: true,
            unique: true
        },
        firstname: String,
        lastname: String
    },
    accounts: {
        local: {
            hash: String,
            salt: String
        },
        facebook: {}
    },
    data: {
        created: {
            type: Date,
            default: Date.now
        },
        lastActive: {
            type: Date,
            default: Date.now
        }
    },
    // Only clients have this data
    clientInfo: {
        zipcode: Number,
        events: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }]
        // profiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }]
    },
    // Only trainers have this data
    trainerInfo: {
        locations: [{
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
        sports: [{ type: String, lowercase: true }],
        packages: [{
            sport: { type: String, lowercase: true },
            size: { type: String, lowercase: true },
            price: String
        }],
        events: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }],
        summary: String,
        experience: String,
        reviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }]
    }
});

// Index our searchable locations
UserSchema.index({"trainerInfo.locations": "2dsphere"});

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

// Set mongoose model
mongoose.model('User', UserSchema);
