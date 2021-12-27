const express = require('express');
const db = require('../config');

const Sale = db.sales;

// Creating a Router
const router = express.Router();

// ADD SALE TO SALE'S TABLE
router.post('/sales', async (req, res) => {
  try {
    const newSale = new Sale(req.body);
    await newSale.save()
      .then(() => res.json('Sale Added'));
  } catch (error) {
    console.error(error);
    res.json('Unsuccessful! Please Try Again');
  }
});

// FIND ALL SALES
router.get('/sales', async (req, res) => {
  try {
    const sales = await Sale.findAll();
    res.json(sales);
  } catch (error) {
    res.status(400).send('Unable to find records');
  }
});

// FIND SALE BY ID
// Edit-button onClick GETs this sale.
router.get('/sales/:id', async (req, res) => {
  try {
    const sale = await Sale.findOne({ id: req.params.id });
    res.json(sale);
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// UPDATE SALE
// Update-button onClick, POSTs this sale.
router.post('/update-sales/:id', async (req) => {
  const sale = await Sale.findOne({ where: { id: req.params.id } });
  if (!sale) {
    throw Error('Sale not updated');
  }
  sale.productName = req.body.productName;
  await sale.save();
});

// DELETE SALE
router.get('/delete-sales/:id', async (req, res) => {
  try {
    await Sale.destroy({ where: { id: req.params.id } });
    res.json('Sale Deleted');
  } catch (error) {
    res.status(400).send('Unable to delete the record from the database');
  }
});

//
module.exports = router;
