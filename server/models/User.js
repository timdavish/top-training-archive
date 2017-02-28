// Module dependencies
var mongoose = require('mongoose');
var crypto = require('crypto'); // Used for generating password hash
var jwt = require('jsonwebtoken'); // Used for generating tokens

exports.ClientType = 'client';
exports.TrainerType = 'trainer';
exports.AdminType = 'admin';
exports.UserTypeEnum = [exports.ClientType, exports.TrainerType, exports.AdminType];
// Define the User schema
var UserSchema = new mongoose.Schema({
    usertype: { // All users have this data
        type: String,
        enum: exports.UserTypeEnum,
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
        facebook: { // Facebook login

        }
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
    },
    products: {
        expired: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],
        pending: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],
        completed: [{
            type: mongoose.Schema.Type.ObjectId,
            ref: 'Product'
        }]

    }
});

// Index our searchable locations
UserSchema.index({ "trainerInfo.locations": "2dsphere" });

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

exports.NewUser = function(info) {
    var ret = UserSchema;
    ret.usertype = info.usertype || '';
    ret.contact = {};
    ret.contact.email = info.contact.email || '';
    ret.contact.phone = info.contact.phone || 0;
    ret.contact.lastname = info.contact.lastname || '';
    ret.contact.firstname = info.contact.firstname || '';
    ret.accounts.facebook = info.accounts.facebook || '';
    ret.data.created = info.data.created || {};
    ret.data.lastactive = info.data.lastactive || {};
    return ret;
};