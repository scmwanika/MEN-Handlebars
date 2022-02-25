const mongoose = require('mongoose');

const { Schema } = mongoose;

const transactionSchema = new Schema({
  userId: {
    type: mongoose.ObjectId,
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
  initial_payment: {
    type: Number,
  },
  creditor: {
    type: Number,
  },
  debtor: {
    type: Number,
  },
  drawings: {
    type: Number,
  },
  transaction_date: {
    type: Date,
  },
}, {
  collection: 'transactions',
});

module.exports = mongoose.model('Transaction', transactionSchema);