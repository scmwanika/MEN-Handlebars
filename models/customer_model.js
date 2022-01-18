const mongoose = require('mongoose');

const { Schema } = mongoose;

const customerSchema = new Schema({
  customer_name: {
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
}, {
  collection: 'customers',
});

module.exports = mongoose.model('Customer', customerSchema);
