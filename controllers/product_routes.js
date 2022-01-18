const express = require('express');
const Product = require('../models/product_model');

// Creating a Router
const router = express.Router();

// GET PRODUCT FORM
router.get('/products', (req, res) => {
  try {
    res.render('create_entity')
  } catch (error) {
    res.status(400).send('Unable to open page');
  }
});

// ADD OR UPDATE PRODUCT DEPENDING ON CONDITION
router.post('/products', (req, res) => {
  if (req.body._id == '')
    insert_product(req, res);
  else
    update_product(req, res);
});

// function to insert data
function insert_product(req, res) {
  const product = new Product();
  product.product_name = req.body.product_name;
  product.category = req.body.category;
  product.retail_price = req.body.retail_price;
  product.save((err, doc) => {
    if (!err)
      res.redirect('products/list');
    else
      console.log('Error during record insertion : ' + err);
  });
}

// function to update data
function update_product(req, res) {
  Product.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
    if (!err) { res.redirect('products/list'); }
  });
}

// SEARCH PRODUCT
router.get('/products/list', async (req, res) => {
  try {
    const products = await Product.find({ product_name: req.query.product_name });
    res.render('read_entity', { products });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// GET A PRODUCT USING IT'S ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.render('edit_entity', { product });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// DELETE PRODUCT
router.get('/products/delete/:id', async (req, res) => {
  try {
    const product = await Product.deleteOne({ _id: req.params.id });
    res.render('read_entity', { product });
  } catch (error) {
    res.status(400).send('Unable to delete the record from the database');
  }
});

//
module.exports = router;