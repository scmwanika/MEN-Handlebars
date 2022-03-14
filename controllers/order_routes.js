require('dotenv').config()
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
      res.redirect('orders/search');
  });
});

// SEARCH YOUR INVOICE BY NAME
router.get('/orders/search', async (req, res) => {
  try {
    const orders = await Order.find({ name: req.query.name });
    res.render('search_order', { orders });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

module.exports = router;