require('dotenv').config()
const session = require('express-session');

const express = require('express');
const ExpressOIDC = require('@okta/oidc-middleware').ExpressOIDC;
const Payment = require('../models/payment_model');

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

// PAY OFF DEBT
router.post('/payments', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    await newPayment.save()
    // res.send('Payment saved.');
  }
  catch (err) {
    console.error(err)
    res.send('Payment not saved; please try again.')
  }
})

module.exports = router;