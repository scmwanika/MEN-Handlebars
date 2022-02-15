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

// INSERT OR UPDATE THE TRANSACTION BY ID
router.post('/transactions', oidc.ensureAuthenticated(), (req, res) => {
  if (req.body._id == '')
    insertTransaction(req, res);
  else
    updateTransaction(req, res);
});

// FUNCTION TO INSERT THE TRANSACTION
const insertTransaction = (req, res) => {
  const newTransaction = new Transaction();

  newTransaction.transaction_type = req.body.transaction_type;
  newTransaction.product = req.body.product;
  newTransaction.quantity = req.body.quantity;
  newTransaction.unit_cost = req.body.unit_cost;
  newTransaction.total_cost = req.body.total_cost;
  newTransaction.payment = req.body.payment;
  newTransaction.initial_payment = req.body.initial_payment;
  newTransaction.balance = req.body.balance;
  newTransaction.transaction_note = req.body.transaction_note;
  newTransaction.witness = req.body.witness;
  newTransaction.transaction_date = req.body.transaction_date;

  newTransaction.save((err) => {
    if (err)
      res.send('Unable to save the transaction; please try again.');
    else
      res.redirect('transactions/search');
  });
}

// FUNCTION TO UPDATE THE TRANSACTION
const updateTransaction = (req, res) => {
  Transaction.updateOne({ _id: req.body._id }, req.body, { new: true }, (err) => {
    if (err)
      res.send('Unable to save the transaction; please try again.');
    else
      res.redirect('transactions/search');
  });
}

// SEARCH THE TRANSACTION BY TRANSACTION_NOTE
router.get('/transactions/search', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const transactions = await Transaction.find({ transaction_note: ['Creditor', 'Debtor'] });
    res.render('search_transactions', { transactions });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// GET THE TRANSACTION BY ID
router.get('/transactions/:id', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id });
    res.render('payment_form', { transaction });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// Join the matching "transactions" and "suppliers"
router.get('/transactions/supplier', oidc.ensureAuthenticated(), async (req, res) => {
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
router.get('/transactions/customer', oidc.ensureAuthenticated(), async (req, res) => {
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
router.get('/transactions/summary', oidc.ensureAuthenticated(), async (req, res) => {
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