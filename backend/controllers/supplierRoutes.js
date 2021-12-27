const express = require('express');
const db = require('../config');

const Supplier = db.suppliers;

// Creating a Router
const router = express.Router();

// ADD SUPPLIER TO SUPPLIER'S TABLE
router.post('/suppliers', async (req, res) => {
  try {
    const newSupplier = new Supplier(req.body);
    await newSupplier.save()
      .then(() => res.json('Supplier Added'));
  } catch (error) {
    console.error(error);
    res.json('Unsuccessful! Please Try Again');
  }
});

// FIND ALL SUPPLIERS
router.get('/suppliers', async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json(suppliers);
  } catch (error) {
    res.status(400).send('Unable to find records');
  }
});

// FIND SUPPLIER BY ID
// Edit-button onClick GETs this supplier.
router.get('/suppliers/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findOne({ id: req.params.id });
    res.json(supplier);
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// UPDATE SUPPLIER
// Update-button onClick, POSTs this supplier.
router.post('/update-suppliers/:id', async (req) => {
  const supplier = await Supplier.findOne({ where: { id: req.params.id } });
  if (!supplier) {
    throw Error('Supplier not updated');
  }
  supplier.supplierName = req.body.supplierName;
  await supplier.save();
});

// DELETE SUPPLIER
router.get('/delete-suppliers/:id', async (req, res) => {
  try {
    await Supplier.destroy({ where: { id: req.params.id } });
    res.json('Suppplier Deleted');
  } catch (error) {
    res.status(400).send('Unable to delete the record from the database');
  }
});

//
module.exports = router;
