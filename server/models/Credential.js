var mongoose = require('mongoose');

var CredentialSchema = new mongoose.Schema({
    experience: {
        type: Number,
        default: 0
    },
    school: {
        type: String,
        default: 'College/University'
    }
});

mongoose.model('Credential', CredentialSchema);