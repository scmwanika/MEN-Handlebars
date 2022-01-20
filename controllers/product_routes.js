const express = require('express');
const Product = require('../models/product_model');

// CREATE A ROUTER
const router = express.Router();

// GET FORM TO INSERT PRODUCT
router.get('/products', (req, res) => {
  try {
    res.render('create_entity')
  } catch (error) {
    res.status(400).send('Unable to open page');
  }
});

// INSERT OR UPDATE PRODUCT DEPENDING ID STATE
router.post('/products', (req, res) => {
  if (req.body._id == '')
    insertProduct(req, res);
  else
    updateProduct(req, res);
});

// FUNCTION TO INSERT PRODUCT TO STORE
const insertProduct = (req, res) => {
  const newProduct = new Product();
  
  newProduct.supplier_name = req.body.supplier_name;
  newProduct.product_name = req.body.product_name;
  newProduct.category = req.body.category;
  newProduct.retail_price = req.body.retail_price;
  newProduct.units_received = req.body.units_received;
  newProduct.value_received = req.body.value_received;
  newProduct.units_issued = req.body.units_issued;
  newProduct.value_issued = req.body.value_issued;
  newProduct.units_instock = req.body.units_instock;
  newProduct.value_instock = req.body.value_instock;
  newProduct.sales_cost = req.body.sales_cost;
  newProduct.gross_profit = req.body.gross_profit;
  newProduct.discontinue = req.body.discontinue;

  newProduct.save((err) => {
    if (!err)
      res.redirect('products/list');
    else
      console.log('insertion error: ' + err);
  });
}

// FUNCTION TO UPDATE PRODUCT IN STORE
const updateProduct = (req, res) => {
  Product.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err) => {
    if (!err)
      res.redirect('products/list');
    else
      console.log('update error: ' + err);
  });
}

// SEARCH PRODUCT BY PRODUCT_NAME
router.get('/products/list', async (req, res) => {
  try {
    const products = await Product.find({ product_name: req.query.product_name });
    res.render('read_entity', { products });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// GET PRODUCT BY ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.render('edit_entity', { product });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// DELETE PRODUCT BY ID
router.get('/products/delete/:id', async (req, res) => {
  try {
    const product = await Product.deleteOne({ _id: req.params.id });
    res.render('read_entity', { product });
  } catch (error) {
    res.status(400).send('Unable to delete the record from the database');
  }
});

module.exports = router;