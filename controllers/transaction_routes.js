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

// Join the matching "transactions" and "suppliers"
router.get('/transactions/supplier', async (req, res) => {
  try {
    const transactions = await Transaction.aggregate
      ([
        {
          $lookup:
          {
            from: 'suppliers',
            localField: 'witness',
            foreignField: 'supplier_name',
            as: 'supplier_details'
          }
        }
      ]);
    res.json(transactions);
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// Join the matching "transactions" and "customers"
router.get('/transactions/customer', async (req, res) => {
  try {
    const transactions = await Transaction.aggregate
      ([
        {
          $lookup:
          {
            from: 'customers',
            localField: 'witness',
            foreignField: 'customer_name',
            as: 'customer_details'
          }
        }
      ]);
    res.json(transactions);
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// Summarize Transactions
router.get('/transactions/summary', async (req, res) => {
  try {
    const transactions = await Transaction.aggregate(
      [{
        "$group": {
          "_id": "$transaction_type",
          total: { $sum: "$total_cost" }
        }
      }]
    );
    res.json(transactions);
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

module.exports = router;