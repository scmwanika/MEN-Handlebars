require('dotenv').config()
const session = require('express-session');
const express = require('express');
const ExpressOIDC = require('@okta/oidc-middleware').ExpressOIDC;
const User = require('../models/user_model');

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

// GET THE CUSTOMER FORM
router.get('/customers', oidc.ensureAuthenticated(), (req, res) => {
  res.render('customer_form');
});

// CREATE NEW, OR UPDATE THE USER(SUPPLIER) BY ID
router.post('/suppliers', oidc.ensureAuthenticated(), (req, res) => {
  if (req.body._id == '')
    insertUser(req, res);
  else
    updateUser(req, res);
});

// CREATE NEW, OR UPDATE THE USER(CUSTOMER) BY ID
router.post('/customers', oidc.ensureAuthenticated(), (req, res) => {
  if (req.body._id == '')
    insertUser(req, res);
  else
    updateUser(req, res);
});

// FUNCTION TO CREATE NEW USER
const insertUser = (req, res) => {
  const newuser = new User();
  
  newuser.user = req.body.user;
  newuser.name = req.body.name;
  newuser.country = req.body.country;
  newuser.city = req.body.city;
  newuser.street = req.body.street;
  newuser.address = req.body.address;
  newuser.telephone = req.body.telephone;
  newuser.email = req.body.email;
  newuser.url = req.body.url;

  newuser.save((err) => {
    if (err)
      res.send('Unable to save the user; please try again.');
    else
      res.redirect('suppliers/list');
  });
}

// FUNCTION TO UPDATE THE USER
const updateUser = (req, res) => {
  user.updateOne({ _id: req.body._id }, req.body, { new: true }, (err) => {
    if (err)
      res.send('Unable to save the user; please try again.');
  });
}

// LIST SUPPLIERS
router.get('/suppliers/list', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const suppliers = await User.find({ user: 'SUPPLIER' });
    res.render('list_suppliers', { suppliers });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// LIST CUSTOMERS
router.get('/customers/list', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const customers = await User.find({ user: 'CUSTOMER' });
    res.render('list_customers', { customers });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// GET THE SUPPLIER BY ID
router.get('/suppliers/:id', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const supplier = await User.findOne({ _id: req.params.id });
    res.render('supplier_product_form', { supplier });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// MATCH USER(Supplier, Customer) AND TRANSACTIONS
router.get('/users/transactions', async (req, res) => {
  try {
    const users = await User.aggregate
      ([
        {
          $lookup:
          {
            from: 'transactions',
            localField: '_id',
            foreignField: 'userId',
            as: 'transaction_details'
          }
        }
      ]);
    res.json(users);
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

module.exports = router;