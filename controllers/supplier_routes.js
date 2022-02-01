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

// GET THE FORM TO INSERT THE SUPPLIER
router.get('/suppliers', oidc.ensureAuthenticated(), (req, res) => {
  try {
    res.render('supplier_form')
  } catch (error) {
    res.status(400).send('Supplier form closed; please try again.');
  }
});

// INSERT THE SUPPLIER
router.post('/suppliers', oidc.ensureAuthenticated(), async (req, res) => {
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