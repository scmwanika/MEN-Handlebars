const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  user: {
    type: String,
  },
  name: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  street: {
    type: String,
  },
  address: {
    type: String,
  },
  telephone: {
    type: String,
  },
  email: {
    type: String,
  },
  website: {
    type: String,
  },
  product: {
    type: String,
  },
  quantity: {
    type: String,
  },
  unit_cost: {
    type: String,
  },
  total_cost: {
    type: String,
  },
  order_date: {
    type: Date,
  },
}, {
  collection: 'orders',
});

module.exports = mongoose.model('Order', orderSchema);
