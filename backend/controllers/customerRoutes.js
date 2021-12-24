const express = require('express');
const db = require('../config');

const Customer = db.customers;

// Creating a Router
const router = express.Router();

// ADD CUSTOMER TO CUSTOMER'S TABLE
router.post('/customers', async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save()
      .then(() => res.json('Customer Added'));
  } catch (error) {
    console.error(error);
    res.json('Unsuccessful! Please Try Again');
  }
});

// FIND ALL CUSTOMERS
router.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(400).send('Unable to find records');
  }
});

// FIND CUSTOMER BY ID
// Edit-button onClick GETs this customer.
router.get('/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });
    res.json(customer);
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// UPDATE CUSTOMER
// Update-button onClick, POSTs this customer.
router.post('/update-customers/:id', async (req, res, next) => {
  Customer.findByIdAndUpdate(req.params.id, {
    $set: req.body,
    // eslint-disable-next-line consistent-return
  }, (error, data) => {
    if (error) {
      return next(error);
    }
    res.json(data);
  });
});

// DELETE CUSTOMER
router.get('/delete-customers/:id', async (req, res) => {
  try {
    await Customer.deleteOne({ _id: req.params.id });
    res.json('Customer Deleted');
  } catch (error) {
    res.status(400).send('Unable to delete the record from the database');
  }
});

//
module.exports = router;
