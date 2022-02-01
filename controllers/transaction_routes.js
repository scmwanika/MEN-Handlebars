require('dotenv').config()
const session = require('express-session');

const express = require('express');
const ExpressOIDC = require('@okta/oidc-middleware').ExpressOIDC;
const Transaction = require('../models/transaction_model');

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

// INSERT THE TRANSACTION
router.post('/transactions', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save()
    // res.send('Transaction saved.');
  }
  catch (err) {
    console.error(err)
    res.send('Transaction not saved; please try again.')
  }
})

module.exports = router;