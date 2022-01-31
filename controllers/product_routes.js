const express = require('express');
const Product = require('../models/product_model');

// CREATE A ROUTER
const router = express.Router();

// INSERT OR UPDATE THE PRODUCT BY ID
router.post('/products', (req, res) => {
  if (req.body._id == '')
    insertProduct(req, res);
  else
    updateProduct(req, res);
});

// FUNCTION TO INSERT THE PRODUCT TO STORE
const insertProduct = (req, res) => {
  const newProduct = new Product();

  newProduct.supplied_by = req.body.supplied_by;
  newProduct.product_name = req.body.product_name;
  newProduct.category = req.body.category;
  newProduct.retail_price = req.body.retail_price;
  newProduct.quantity_purchased = req.body.units_purchased;
  newProduct.purchases = req.body.purchases;
  newProduct.quantity_sold = req.body.units_sold;
  newProduct.sales = req.body.sales;
  newProduct.quantity_instock = req.body.units_instock;
  newProduct.closing_stock = req.body.closing_stock;
  newProduct.cost_of_sales = req.body.cost_of_sales;
  newProduct.gross_profit = req.body.gross_profit;
  newProduct.discontinued = req.body.discontinued;

  newProduct.save((err) => {
    if (!err)
      res.redirect('products/search');
    else
      console.log('insertion error: ' + err);
  });
}

// FUNCTION TO UPDATE THE PRODUCT IN STORE
const updateProduct = (req, res) => {
  Product.updateOne({ _id: req.body._id }, req.body, { new: true }, (err) => {
    if (!err)
      res.redirect('products/search');
    else
      console.log('update error: ' + err);
  });
}

// SEARCH THE PRODUCT BY PRODUCT_NAME
router.get('/products/search', async (req, res) => {
  try {
    const products = await Product.find({ product_name: req.query.product_name });
    res.render('search_product', { products });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// LIST PRODUCTS
router.get('/products/list', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('list_products', { products });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// GET THE PRODUCT BY ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.render('product_form', { product });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// DELETE THE PRODUCT BY ID
router.get('/products/delete/:id', async (req, res) => {
  try {
    const product = await Product.deleteOne({ _id: req.params.id });
    res.render('search_product', { product });
  } catch (error) {
    res.status(400).send('Unable to delete the record from the database');
  }
});

module.exports = router;