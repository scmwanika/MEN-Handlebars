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
    type: String,
  },
  fixed_asset: {
    type: String,
  },
  business_expense: {
    type: String,
  },
  cash_withdrawn: {
    type: String,
  },
  updated_on: {
    type: Date,
  },
}, {
  collection: 'operations',
});

module.exports = mongoose.model('Operation', operationSchema);