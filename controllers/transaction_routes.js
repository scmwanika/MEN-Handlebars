const express = require('express');
const Transaction = require('../models/transaction_model');

// CREATE A ROUTER
const router = express.Router();

// INSERT CUSTOMER
router.post('/transactions', async (req, res) => {
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