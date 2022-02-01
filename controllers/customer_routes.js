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

module.exports = router;