const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  user_id: {
    type: mongoose.ObjectId,
  },
  file_name: {
    type: String,
  },
  product_name: {
    type: String,
  },
  category: {
    type: String,
  },
  measurement: {
    type: String,
  },
  retail_price: {
    type: Number,
  },
  quantity_purchased: {
    type: Number,
  },
  net_purchases: {
    type: Number,
  },
  quantity_sold: {
    type: Number,
  },
  net_sales: {
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
  gross_profit_or_loss: {
    type: Number,
  },
  discontinued: {
    type: String,
  },
  created_on: {
    type: Date,
  },
  updated_on: {
    type: Date,
  },
}, {
  collection: 'products',
});

module.exports = mongoose.model('Product', productSchema);
