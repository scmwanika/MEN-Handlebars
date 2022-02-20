const mongoose = require('mongoose');

const { Schema } = mongoose;

const paymentSchema = new Schema({
  user_id: {
    type: mongoose.ObjectId,
  },
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