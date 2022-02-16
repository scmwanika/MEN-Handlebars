require('dotenv').config()
const session = require('express-session');

const express = require('express');
const ExpressOIDC = require('@okta/oidc-middleware').ExpressOIDC;
const Supplier = require('../models/supplier_model');

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

// GET THE SUPPLIER FORM
router.get('/suppliers', oidc.ensureAuthenticated(), (req, res) => {
  res.render('supplier_form');
});

// INSERT OR UPDATE THE SUPPLIER BY ID
router.post('/suppliers', oidc.ensureAuthenticated(), (req, res) => {
  if (req.body._id == '')
    insertSupplier(req, res);
  else
    updateSupplier(req, res);
});

// FUNCTION TO INSERT THE SUPPLIER
const insertSupplier = (req, res) => {
  const newsupplier = new Supplier();

  newsupplier.supplier_name = req.body.supplier_name;
  newsupplier.country = req.body.country;
  newsupplier.city = req.body.city;
  newsupplier.street = req.body.street;
  newsupplier.address = req.body.address;
  newsupplier.telephone = req.body.telephone;
  newsupplier.email = req.body.email;
  newsupplier.url = req.body.url;

  newsupplier.save((err) => {
    if (err)
      res.send('Unable to save the supplier; please try again.');
    else
      res.redirect('suppliers/list');
  });
}

// FUNCTION TO UPDATE THE SUPPLIER
const updateSupplier = (req, res) => {
  supplier.updateOne({ _id: req.body._id }, req.body, { new: true }, (err) => {
    if (err)
      res.send('Unable to save the supplier; please try again.');
  });
}

// LIST SUPPLIERS
router.get('/suppliers/list', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.render('list_suppliers', { suppliers });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// GET THE SUPPLIER BY ID
router.get('/suppliers/:id', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const supplier = await Supplier.findOne({ _id: req.params.id });
    res.render('supplier_product_form', { supplier });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// Join the matching "suppliers" and "transactions"
router.get('/suppliers-transaction', async (req, res) => {
  try {
    const suppliers = await Supplier.aggregate
      ([
        {
          $lookup:
          {
            from: 'transactions',
            localField: 'supplier_name',
            foreignField: 'witness',
            as: 'transaction_details'
          }
        }
      ]);
    res.json(suppliers);
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// Join the matching "suppliers" and "products"
router.get('/suppliers-product', async (req, res) => {
  try {
    const suppliers = await Supplier.aggregate
      ([
        {
          $lookup:
          {
            from: 'products',
            localField: 'supplier_name',
            foreignField: 'supplied_by',
            as: 'product_details'
          }
        }
      ]);
    res.json(suppliers);
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

module.exports = router;