const express = require('express');
const db = require('../config');

const Product = db.products;

// Creating a Router
const router = express.Router();

// ADD PRODUCT TO PRODUCT'S TABLE
router.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save()
      .then(() => res.json('Product Added'));
  } catch (error) {
    console.error(error);
    res.json('Unsuccessful! Please Try Again');
  }
});

// FIND ALL PRODUCTS
router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(400).send('Unable to find records');
  }
});

// FIND PRODUCT BY ID
// Edit-button onClick GETs this product.
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });
    res.json(product);
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// UPDATE PRODUCT
// Update-button onClick, POSTs this product.
router.post('/update-products/:id', async (req) => {
  const product = await Product.findOne({ where: { id: req.params.id } });
  if (!product) {
    throw Error('Product not updated');
  }
  product.productName = req.body.productName;
  await product.save();
});

// DELETE PRODUCT
router.get('/delete-products/:id', async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.json('Product Deleted');
  } catch (error) {
    res.status(400).send('Unable to delete the record from the database');
  }
});

//
module.exports = router;
