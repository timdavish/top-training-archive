var mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema({
    owner: { //Trainer
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
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
});

mongoose.model('Service',serviceSchema);
