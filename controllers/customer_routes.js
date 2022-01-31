const express = require('express');
const Customer = require('../models/customer_model');

// CREATE A ROUTER
const router = express.Router();

// INSERT THE CUSTOMER
router.post('/customers', async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save()
    // res.send('Customer saved.');
  }
  catch (err) {
    console.error(err)
    res.send('Customer not saved; please try again.')
  }
})

module.exports = router;