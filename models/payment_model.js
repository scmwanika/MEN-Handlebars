const mongoose = require('mongoose');

const { Schema } = mongoose;

const paymentSchema = new Schema({
  payment_date: {
    type: Date,
  },
  amount_paid: {
    type: Number,
  },
}, {
  collection: 'payments',
});

module.exports = mongoose.model('Payment', paymentSchema);