const mongoose = require('mongoose');

const { Schema } = mongoose;

const purchaseSchema = new Schema({
  purchased_from: {
    type: String,
  },
  product_purchased: {
    type: String,
  },
  units_purchased: {
    type: Number,
  },
  unit_cost: {
    type: Number,
  },
  total_cost: {
    type: Number,
  },
  purchase_note: {
    type: String,
  },
}, {
  collection: 'purchases',
});

module.exports = mongoose.model('Purchase', purchaseSchema);
