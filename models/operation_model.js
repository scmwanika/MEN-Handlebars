const mongoose = require('mongoose');

const { Schema } = mongoose;

const operationSchema = new Schema({
  transaction_type: {
    type: String,
  },
  note: {
    type: String,
  },
  equity: {
    type: Number,
  },
  fixed_asset: {
    type: Number,
  },
  business_expense: {
    type: Number,
  },
  updated_on: {
    type: Date,
  },
}, {
  collection: 'operations',
});

module.exports = mongoose.model('Operation', operationSchema);