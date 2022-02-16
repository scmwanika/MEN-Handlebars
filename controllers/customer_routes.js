require('dotenv').config()
const session = require('express-session');

const express = require('express');
const ExpressOIDC = require('@okta/oidc-middleware').ExpressOIDC;
const Customer = require('../models/customer_model');

// CREATE A ROUTER
const router = express.Router();

router.use(session({
  cookie: { httpOnly: true },
  secret: `${process.env.OKTA_CLIENT_SECRET}`,
  resave: true,
  saveUninitialized: false
}));

const oidc = new ExpressOIDC({
  appBaseUrl: `${process.env.HOST_URL}`,
  issuer: `${process.env.OKTA_ORG_URL}`,
  client_id: process.env.OKTA_CLIENT_ID,
  client_secret: process.env.OKTA_CLIENT_SECRET,
  scope: 'openid profile email'
});

router.use(oidc.router);

// INSERT THE CUSTOMER
router.post('/customers', oidc.ensureAuthenticated(), async (req, res) => {
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

// Join the matching "customers" and "transactions"
router.get('/customers-transaction', async (req, res) => {
  try {
    const customers = await Customer.aggregate
      ([
        {
          $lookup:
          {
            from: 'transactions',
            localField: 'customer_name',
            foreignField: 'witness',
            as: 'transaction_details'
          }
        }
      ]);
    res.json(customers);
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

module.exports = router;