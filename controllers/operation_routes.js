require('dotenv').config()
const session = require('express-session');
const express = require('express');
const ExpressOIDC = require('@okta/oidc-middleware').ExpressOIDC;
const Operation = require('../models/operation_model');

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

// GET THE OPERATIONS FORM
router.get('/operations', oidc.ensureAuthenticated(), (req, res) => {
  res.render('operations');
});

// INSERT OR UPDATE OPERATIONS BY ID
router.post('/operations', oidc.ensureAuthenticated(), (req, res) => {
  if (req.body._id == '')
    insertOperation(req, res);
  else
    updateOperation(req, res);
});

// FUNCTION TO INSERT THE OPERATION
const insertOperation = (req, res) => {
  const newOperation = new Operation();

  newOperation.transaction_type = req.body.transaction_type;
  newOperation.note = req.body.note;
  newOperation.equity = req.body.equity;
  newOperation.fixed_asset = req.body.fixed_asset;
  newOperation.business_expense = req.body.business_expense;
  newOperation.updated_on = req.body.updated_on;

  newOperation.save((err) => {
    if (err)
      res.send('Unable to save the operation; please try again.');
  });
}

// FUNCTION TO UPDATE THE OPERATION
const updateOperation = (req, res) => {
  Operation.updateOne({ _id: req.body._id }, req.body, { new: true }, (err) => {
    if (err)
      res.send('Unable to save the operation; please try again.');
    else
      res.redirect('transactions/debt');
  });
}

// GET THE OPERATION BY ID
router.get('/operations/:id', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const operation = await Operation.findOne({ _id: req.params.id });
    //res.render('payment_form', { operation });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// FINANCES, INVESTMENTS, BUSINESS EXPENSES
router.get('/finances-investments-business-costs', async (req, res) => {
  try {
    const operations = await Operation.aggregate(
      [{
        "$group": {
          "_id": "",
          equity: { $sum: "$equity" },
          fixed_asset: { $sum: "$fixed_asset" },
          business_expense: { $sum: "$business_expense" }
        }
      }]
    );
    res.render('finances_investments_business_expenses', {operations});
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

module.exports = router;