
// Module dependencies
var mongoose = require('mongoose');
var crypto = require('crypto'); // Used for generating password hash
var jwt = require('jsonwebtoken'); // Used for generating tokens

// Define the User model schema
var UserSchema = new mongoose.Schema({
    usertype: { type: String, lowercase: true },
    contact: {
        email: { type: String, lowercase: true, unique: true },
        firstname: String,
        lastname: String
    },
    accounts: {
        local: {
            hash: String,
            salt: String
        },
        facebook: {

        }
    },
    clientInfo: {
        zipcode: Number,
        events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
        // profiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }]
    },
    trainerInfo: {
        locations: [{ type: String }],
        sports: [{ type: String, lowercase: true }],
        events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
    }
});

// Set a hashed password using a crypto salt
UserSchema.methods.setPassword = function(password) {
    this.accounts.local.salt = crypto.randomBytes(16).toString('hex');
    this.accounts.local.hash = crypto.pbkdf2Sync(password, this.accounts.local.salt, 1000, 64).toString('hex');
};

// Validate a password using the crypto salt
UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.accounts.local.salt, 1000, 64).toString('hex');
    return this.accounts.local.hash === hash;
};

// Generate a token
UserSchema.methods.generateJWT = function() {
    // Set token experation (60 days)
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        _id: this._id,
        email: this.contact.email,
        usertype: this.usertype,
        exp: parseInt(exp.getTime() / 1000)
    }, 'SECRET');
    // CHANGE 'SECRET' TO REFERENCE AN ENVIRONMENT VARIABLE OUTSIDE OF CODEBASE
};

// Set mongoose model
mongoose.model('User', UserSchema);
