const mongoose = require('mongoose');

const { Schema } = mongoose;

const paymentSchema = new Schema({
  payment_date: {
    type: Date,
  },
  later_payment: {
    type: Number,
  },
}, {
  collection: 'payments',
});

module.exports = mongoose.model('Payment', paymentSchema);