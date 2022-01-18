const mongoose = require('mongoose');

const { Schema } = mongoose;

const accountSchema = new Schema({
  account_name: {
    type: String,
  },
  amount: {
    type: Number,
  },
  notes: {
    type: String,
  },
}, {
  collection: 'accounts',
});

module.exports = mongoose.model('Account', accountSchema);
