
// Module dependencies
var mongoose = require('mongoose');
var crypto = require('crypto'); // Used for generating password hash
var jwt = require('jsonwebtoken'); // Used for generating tokens

// Define the User schema
var UserSchema = new mongoose.Schema({
    usertype: { // All users have this data
        type: String,
        enum: ['client', 'trainer', 'admin'],
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
    },

    trainerInfo: { // Trainer specific data
        sports: [{ // Each sport requires seperate data set
            sport: { // The sport
                type: String,
                default: 'Basketball',
                required: true
            },
            packages: [{ // Packages for this sport
                count: { // Number of sessions in a package
                    type: Number,
                    enum: [1, 2, 5, 10],
                    default: 1
                },
                size: { // Number of clients in each session
                    type: Number,
                    default: 1
                },
                price: { // Price
                    type: Number,
                    default: 30
                }
            }],
            events: [{ // Events for this sport
                type: mongoose.Schema.Types.ObjectId,
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
        /*
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
        */
        //Reviews Removed,
        //Call from Reviews Schema
        /*
        reviews: [{ // Trainer reviews
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }]
        */
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
