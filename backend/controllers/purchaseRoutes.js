const express = require('express');
const db = require('../config');

const Purchase = db.purchases;

// Creating a Router
const router = express.Router();

// ADD PURCHASE TO PURCHASE'S TABLE
router.post('/purchases', async (req, res) => {
  try {
    const newPurchase = new Purchase(req.body);
    await newPurchase.save()
      .then(() => res.json('Purchase Added'));
  } catch (error) {
    console.error(error);
    res.json('Unsuccessful! Please Try Again');
  }
});

// FIND ALL PURCHASES
router.get('/purchases', async (req, res) => {
  try {
    const purchases = await Purchase.findAll();
    res.json(purchases);
  } catch (error) {
    res.status(400).send('Unable to find records');
  }
});

// FIND PURCHASE BY ID
// Edit-button onClick GETs this purchase.
router.get('/purchases/:id', async (req, res) => {
  try {
    const purchase = await Purchase.findOne({ _id: req.params.id });
    res.json(purchase);
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// UPDATE PURCHASE
// Update-button onClick, POSTs this purchase.
router.post('/update-purchases/:id', async (req, res, next) => {
  Purchase.findByIdAndUpdate(req.params.id, {
    $set: req.body,
    // eslint-disable-next-line consistent-return
  }, (error, data) => {
    if (error) {
      return next(error);
    }
    res.json(data);
  });
});

// DELETE PURCHASE
router.get('/delete-purchases/:id', async (req, res) => {
  try {
    await Purchase.deleteOne({ _id: req.params.id });
    res.json('Purchase Deleted');
  } catch (error) {
    res.status(400).send('Unable to delete the record from the database');
  }
});

//
module.exports = router;
