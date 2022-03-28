const mongoose = require('mongoose');

const { Schema } = mongoose;

const finance_and_investmentsSchema = new Schema({
  transaction_type: {
    type: String,
  },
  note: {
    type: String,
  },
  equity: {
    type: Number,
  },
  loan: {
    type: Number,
  },
  fixed_asset: {
    type: Number,
  },
  business_expense: {
    type: Number,
  },
  cash_withdrawn: {
    type: Number,
  },
  updated_on: {
    type: Date,
  },
}, {
  collection: 'finance-and-investments',
});

module.exports = mongoose.model('financeAndInvestment', finance_and_investmentsSchema);