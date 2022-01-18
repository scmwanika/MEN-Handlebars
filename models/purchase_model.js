const mongoose = require('mongoose');

const { Schema } = mongoose;

const purchaseSchema = new Schema({
  product_name: {
    type: String,
  },
  units_purchased: {
    type: Number,
  },
  unit_value: {
    type: Number,
  },
  purchased_value: {
    type: Number,
  },
  notes: {
    type: String,
  },
}, {
  collection: 'purchases',
});

module.exports = mongoose.model('Purchase', purchaseSchema);
