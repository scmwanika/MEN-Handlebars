const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  supplied_by: {
    type: String,
  },
  product_name: {
    type: String,
  },
  category: {
    type: String,
  },
  retail_price: {
    type: Number,
  },
  quantity_purchased: {
    type: Number,
  },
  purchases: {
    type: Number,
  },
  quantity_sold: {
    type: Number,
  },
  sales: {
    type: Number,
  },
  quantity_instock: {
    type: Number,
  },
  closing_stock: {
    type: Number,
  },
  cost_of_sales: {
    type: Number,
  },
  gross_profit: {
    type: Number,
  },
  discontinued: {
    type: String,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
}, {
  collection: 'products',
});

module.exports = mongoose.model('Product', productSchema);
