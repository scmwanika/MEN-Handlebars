const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  product_name: {
    type: String,
  },
  category: {
    type: String,
  },
  retail_price: {
    type: Number,
  },
  units_received: {
    type: Number,
  },
  value_received: {
    type: Number,
  },
  units_issued: {
    type: Number,
  },
  value_issued: {
    type: Number,
  },
  units_instock: {
    type: Number,
  },
  value_instock: {
    type: Number,
  },
  sales_cost: {
    type: Number,
  },
  gross_profit: {
    type: Number,
  },
  discontinue: {
    type: String,
  },
}, {
  collection: 'products',
});

module.exports = mongoose.model('Product', productSchema);
