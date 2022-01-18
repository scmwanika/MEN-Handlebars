const mongoose = require('mongoose');

const { Schema } = mongoose;

const saleSchema = new Schema({
  product_name: {
    type: String,
  },
  units_sold: {
    type: Number,
  },
  unit_value: {
    type: Number,
  },
  sold_value: {
    type: Number,
  },
  notes: {
    type: String,
  },
}, {
  collection: 'sales',
});

module.exports = mongoose.model('Sale', saleSchema);
