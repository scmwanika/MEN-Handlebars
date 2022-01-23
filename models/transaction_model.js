const mongoose = require('mongoose');

const { Schema } = mongoose;

const transactionSchema = new Schema({
  witness: {
    type: String,
  },
  transaction_type: {
    type: String,
  },
  product: {
    type: String,
  },
  units_transacted: {
    type: Number,
  },
  unit_value: {
    type: Number,
  },
  total_value: {
    type: Number,
  },
  transaction_note: {
    type: String,
  },
}, {
  collection: 'transactions',
});

module.exports = mongoose.model('Transaction', transactionSchema);
