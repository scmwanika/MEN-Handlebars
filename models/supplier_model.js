const mongoose = require('mongoose');

const { Schema } = mongoose;

const supplierSchema = new Schema({
  supplier_name: {
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
  collection: 'suppliers',
});

module.exports = mongoose.model('Supplier', supplierSchema);
