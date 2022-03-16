require('dotenv').config();
const { default: axios } = require('axios');
const express = require('express');
const Order = require('../models/order_model');

// CREATE A ROUTER
const router = express.Router();

// PLACE YOUR ORDER
router.post('/orders', async (req, res) => {
  const newOrder = new Order(req.body);
  await newOrder.save((err) => {
    if (err)
      res.send('Dear customer, we have not received your order; please try again.');
    else
      res.redirect('/');
  });
});

module.exports = router;