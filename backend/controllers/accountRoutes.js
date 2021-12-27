const express = require('express');
const db = require('../config');

const Account = db.accounts;

// Creating a Router
const router = express.Router();

// ADD ACCOUNT TO ACCOUNT'S TABLE
router.post('/accounts', async (req, res) => {
  try {
    const newAccount = new Account(req.body);
    await newAccount.save()
      .then(() => res.json('Account Added'));
  } catch (error) {
    console.error(error);
    res.json('Unsuccessful! Please Try Again');
  }
});

// FIND ALL ACCOUNTS
router.get('/accounts', async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.json(accounts);
  } catch (error) {
    res.status(400).send('Unable to find records');
  }
});

// FIND ACCOUNT BY ID
// Edit-button onClick GETs this account.
router.get('/accounts/:id', async (req, res) => {
  try {
    const account = await Account.findOne({ id: req.params.id });
    res.json(account);
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// UPDATE ACCOUNT
// Update-button onClick, POSTs this account.
router.post('/update-accounts/:id', async (req) => {
  const account = await Account.findOne({ where: { id: req.params.id } });
  if (!account) {
    throw Error('Account not updated');
  }
  account.accountName = req.body.accountName;
  await account.save();
});

// DELETE ACCOUNT
router.get('/delete-accounts/:id', async (req, res) => {
  try {
    await Account.destroy({ where: { id: req.params.id } });
    res.json('Account Deleted');
  } catch (error) {
    res.status(400).send('Unable to delete the record from the database');
  }
});

//
module.exports = router;
