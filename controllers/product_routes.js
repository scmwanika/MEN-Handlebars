require('dotenv').config()
const session = require('express-session');

const express = require('express');
const ExpressOIDC = require('@okta/oidc-middleware').ExpressOIDC;
const Product = require('../models/product_model');

// CREATE A ROUTER
const router = express.Router();

router.use(session({
  cookie: { httpOnly: true },
  secret: `${process.env.OKTA_CLIENT_SECRET}`,
  resave: true,
  saveUninitialized: false
}));

const oidc = new ExpressOIDC({
  appBaseUrl: `${process.env.HOST_URL}`,
  issuer: `${process.env.OKTA_ORG_URL}`,
  client_id: process.env.OKTA_CLIENT_ID,
  client_secret: process.env.OKTA_CLIENT_SECRET,
  scope: 'openid profile email'
});

router.use(oidc.router);

// INSERT OR UPDATE THE PRODUCT BY ID
router.post('/products', oidc.ensureAuthenticated(), (req, res) => {
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
  newProduct.created_at = req.body.created_at;
  newProduct.updated_at = req.body.updated_at;

  newProduct.save((err) => {
    if (err)
      res.send('Unable to save the product; please try again.');
    else
      res.redirect('products/search');
  });
}

// FUNCTION TO UPDATE THE PRODUCT IN STORE
const updateProduct = (req, res) => {
  Product.updateOne({ _id: req.body._id }, req.body, { new: true }, (err) => {
    if (err)
      res.send('Unable to save the product; please try again.');
    else
      res.redirect('products/search');
  });
}

// SEARCH THE PRODUCT BY NAME
router.get('/products/search', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const products = await Product.find({ product_name: req.query.product_name });
    res.render('search_product', { products });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// LIST PRODUCTS
router.get('/products/list', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const products = await Product.find();
    res.render('list_products', { products });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// Join the matching "products" and "suppliers"
router.get('/products/supplier', async (req, res) => {
  try {
    const products = await Product.aggregate
      ([
        {
          $lookup:
          {
            from: 'suppliers',
            localField: 'supplied_by',
            foreignField: 'supplier_name',
            as: 'supplier_details'
          }
        }
      ]);
    res.json(products);
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// Trading Profit & Loss Accounts (TPL Accounts)
router.get('/products/report', async (req, res) => {
  try {
    const products = await Product.aggregate(
      [{
        "$group": {
          "_id": "$product_name",
          cash: { $sum: { $subtract: ["$gross_profit", "$closing_stock"] } }
        }
      }]
    );
    res.json(products);
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// GET THE PRODUCT BY ID
router.get('/products/:id', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.render('product_form', { product });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// DELETE THE PRODUCT BY ID
router.get('/products/delete/:id', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const product = await Product.deleteOne({ _id: req.params.id });
    res.render('search_product', { product });
  } catch (error) {
    res.status(400).send('Unable to delete the record from the database');
  }
});

module.exports = router;