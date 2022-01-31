const express = require('express');
const Supplier = require('../models/supplier_model');

// CREATE A ROUTER
const router = express.Router();

// GET THE FORM TO INSERT THE SUPPLIER
router.get('/suppliers', (req, res) => {
  try {
    res.render('supplier_form')
  } catch (error) {
    res.status(400).send('Supplier form closed; please try again.');
  }
});

// INSERT THE SUPPLIER
router.post('/suppliers', async (req, res) => {
  try {
    const newSupplier = new Supplier(req.body);
    await newSupplier.save()
    // res.send('Supplier saved.');
  }
  catch (err) {
    console.error(err)
    res.send('Supplier not saved; please try again.')
  }
})

module.exports = router;