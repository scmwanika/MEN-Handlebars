const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  user: {
    type: String,
  },
  user_name: {
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
  collection: 'users',
});

module.exports = mongoose.model('User', userSchema);
