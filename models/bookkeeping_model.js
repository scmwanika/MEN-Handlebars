const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookkeepingsSchema = new Schema({
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
  cash_drawn: {
    type: Number,
  },
  updated_on: {
    type: Date,
  },
}, {
  collection: 'bookkeepings',
});

module.exports = mongoose.model('Bookkeeping', bookkeepingsSchema);