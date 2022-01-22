const express = require('express');
const Account = require('../models/account_model');

// CREATE A ROUTER
const router = express.Router();

// GET THE FORM TO INSERT ACCOUNT
router.get('/accounts', (req, res) => {
  try {
    res.render('account_form')
  } catch (error) {
    res.status(400).send('Account form closed; please try again.');
  }
});

// INSERT OR UPDATE ACCOUNT DEPENDING ON ID
router.post('/accounts', (req, res) => {
  if (req.body._id == '')
    insertAccount(req, res);
  else
    updateAccount(req, res);
});

// FUNCTION TO INSERT ACCOUNT
const insertAccount = (req, res) => {
  const newAccount = new Account();

  newAccount.account_name = req.body.account_name;
  newAccount.amount = req.body.amount;
  newAccount.notes = req.body.notes;

  newAccount.save((err) => {
    if (!err)
      res.redirect('accounts/list');
    else
      console.log('insertion error: ' + err);
  });
}

// FUNCTION TO UPDATE ACCOUNT
const updateAccount = (req, res) => {
  Account.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err) => {
    if (!err)
      res.redirect('accounts/list');
    else
      console.log('update error: ' + err);
  });
}

// SEARCH ACCOUNT BY ACCOUNT_NAME
router.get('/accounts/list', async (req, res) => {
  try {
    const accounts = await Account.find({ account_name: req.query.account_name });
    res.render('search_account', { accounts });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// GET ACCOUNT BY ID
router.get('/accounts/:id', async (req, res) => {
  try {
    const account = await Account.findOne({ _id: req.params.id });
    res.render('account_edit', { account });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// DELETE ACCOUNT BY ID
router.get('/accounts/delete/:id', async (req, res) => {
  try {
    const account = await Account.deleteOne({ _id: req.params.id });
    res.render('search_account', { account });
  } catch (error) {
    res.status(400).send('Unable to delete the record from the database');
  }
});

module.exports = router;