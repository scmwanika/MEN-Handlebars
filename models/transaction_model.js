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
  quantity: {
    type: Number,
  },
  unit_cost: {
    type: Number,
  },
  total_cost: {
    type: Number,
  },
  payment: {
    type: String,
  },
  amount: {
    type: Number,
  },
  balance: {
    type: Number,
  },
  transaction_note: {
    type: String,
  },
  transaction_date: {
    type: Date,
  },
}, {
  collection: 'transactions',
});

module.exports = mongoose.model('Transaction', transactionSchema);
