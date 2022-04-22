// IMPORTING DEPENDENCIES
const { default: axios } = require('axios');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const session = require('express-session');
const ExpressOIDC = require('@okta/oidc-middleware').ExpressOIDC;
const mongoose = require('mongoose');
require('dotenv').config();

const { HOST_URL, OKTA_ORG_URL, OKTA_CLIENT_ID, OKTA_CLIENT_SECRET, DATABASE, PORT } = process.env;

const app = express();

// HANDLEBARS THE VIEW TEMPLATE ENGINE
app.set('view engine', 'hbs');

// SERVING MULTIPLE STATIC DIRECTORIES WITH MIDDLEWARE FUNCTION express.static
app.use(express.static('static/css'));
app.use(express.static('static/img'));
app.use(express.static('uploads'));

// CONFIGURE FILE UPLOAD
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
const upload = multer({ storage: storage }).single('photo');

// USER SESSION
app.use(session({
  cookie: { httpOnly: true },
  secret: `${OKTA_CLIENT_SECRET}`,
  resave: true,
  saveUninitialized: false
}));

// AUTHENTICATE USER
const oidc = new ExpressOIDC({
  appBaseUrl: HOST_URL,
  issuer: OKTA_ORG_URL,
  client_id: OKTA_CLIENT_ID,
  client_secret: OKTA_CLIENT_SECRET,
  redirect_uri: `${HOST_URL}/authorization-code/callback`,
  scope: 'openid profile email'
});

app.use(oidc.router);

// MANIPULATE DATABASE USING JSON
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// CONNECT DATABASE
mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .on('open', () => {
    console.log('Database successfully connected');
  })
  .on('error', (error) => {
    console.log(`Sorry! Database disconnected: ${error.message}`);
  });

// IMPORT MODELS
const User = require('./models/user_model');
const Product = require('./models/product_model');
const items = require('./json/product_catalogue');
const Transaction = require('./models/transaction_model');
const Payment = require('./models/payment_model');
const FinanceAndInvestment = require('./models/finance_and_investment_model');

/* --- USER CONTROLLERS --- */

// GET AND FILL IN THE USER (Supplier)
app.get('/suppliers/new', oidc.ensureAuthenticated(), (req, res) => {
  res.render('supplier_form');
});

// CREATE USER (Supplier)
app.post('/suppliers/new', oidc.ensureAuthenticated(), async (req, res) => {
  const newSupplier = new User(req.body);
  await newSupplier.save((error) => {
    if (error)
      res.send('Sorry! Unsuccessful. Please Try Again.');
    else
      res.redirect('/suppliers');
  });
});

// EDIT USER (Supplier)
app.post('/suppliers/edit', oidc.ensureAuthenticated(), (req, res) => {
  Product.updateOne({ _id: req.body._id }, req.body, { new: true }, (error) => {
    if (error)
      res.send('Sorry! Unsuccessful. Please Try Again.');
    else
      res.redirect('/suppliers');
  });
});

// GET THE USER (Supplier) BY ID
app.get('/suppliers/:id', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const supplier = await User.findOne({ _id: req.params.id });
    res.render('supplies_form', { supplier, items });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// GET AND FILL IN THE USER (Customer)
app.get('/customers/new', oidc.ensureAuthenticated(), (req, res) => {
  res.render('customer_form');
});

// CREATE USER (Customer)
app.post('/customers/new', oidc.ensureAuthenticated(), async (req, res) => {
  const newCustomer = new User(req.body);
  await newCustomer.save((error) => {
    if (error)
      res.send('Sorry! Unsuccessful. Please Try Again.');
    else
      res.redirect('/products/search');
  });
});

/* --- PRODUCT CONTROLLERS --- */

// INDEX PAGE: THE PRODUCT CATALOGUE
app.get('/', async (req, res) => {
  try {
    // search by category and retrieve products not discontinued
    const products = await Product.find({ category: req.query.category, discontinued: 'No' });
    res.render('index', { products, items });
  } catch (error) {
    res.status(400).send('index page closed; please try again.');
  }
});

// UPLOAD FILE (Product)
app.post('/uploads', oidc.ensureAuthenticated(), (req, res) => {
  upload(req, res, (error) => {
    if (error) {
      return res.end('Sorry! Unsuccessful. Please Try Again.');
    }
  });
});

// CREATE PRODUCT
app.post('/products/new', oidc.ensureAuthenticated(), async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save((error) => {
    if (error)
      res.send('Sorry! Unsuccessful. Please Try Again.');
    else
      res.redirect('/products/search');
  });
});

// EDIT PRODUCT
app.post('/products/edit', oidc.ensureAuthenticated(), (req, res) => {
  Product.updateOne({ _id: req.body._id }, req.body, { new: true }, (error) => {
    if (error)
      res.send('Sorry! Unsuccessful. Please Try Again.');
    else
      res.redirect('/products/search');
  });
});

// SEARCH THE PRODUCT BY NAME
app.get('/products/search', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const products = await Product.find({ product_name: req.query.product_name });
    res.render('search_product', { products });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// DELETE THE PRODUCT BY ID
app.get('/products/delete/:id', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const product = await Product.deleteOne({ _id: req.params.id });
    res.render('search_product', { product });
  } catch (error) {
    res.status(400).send('Unable to delete the record from the database');
  }
});

// GET THE PRODUCT BY ID (Purchases)
app.get('/purchases/products/:id', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.render('purchase_product', { product });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// GET THE PRODUCT BY ID (Sales)
app.get('/sales/products/:id', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    const customers = await axios.get('http://stock-life.herokuapp.com/customers');
    res.render('sale_product', { product, customers: customers.data });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// GET THE PRODUCT BY ID (Goods Withdrawn)
app.get('/drawings/products/:id', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.render('withdraw_product', { product });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// GET THE PRODUCT BY ID (Product Catalogue)
app.get('/items/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.render('order_form', { product });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

/* --- TRANSACTION CONTROLLERS --- */

// CREATE TRANSACTION
app.post('/transactions/new', oidc.ensureAuthenticated(), async (req, res) => {
  const newTransaction = new Transaction(req.body);
  await newTransaction.save((error) => {
    if (error)
      res.send('Sorry! Unsuccessful. Please Try Again.');
  });
});

// EDIT TRANSACTION
app.post('/transactions/edit', oidc.ensureAuthenticated(), (req, res) => {
  Transaction.updateOne({ _id: req.body._id }, req.body, { new: true }, (error) => {
    if (error)
      res.send('Sorry! Unsuccessful. Please Try Again.');
    else
      res.redirect('/products/search');
  });
});

// GET THE TRANSACTION BY ID
app.get('/transactions/:id', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id });
    res.render('payment_form', { transaction });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

/* --- PAYMENT CONTROLLERS --- */

// PAY OFF DEBT
app.post('/payments/new', oidc.ensureAuthenticated(), async (req, res) => {
  const newPayment = new Payment(req.body);
  await newPayment.save((error) => {
    if (error)
      res.send('Sorry! Unsuccessful. Please Try Again.');
  });
});

/* --- FINANCE AND INVESTMENTS CONTROLLERS --- */

// GET THE FINANCE AND INVESTMENTS FORM
app.get('/finance-and-investments/new', oidc.ensureAuthenticated(), (req, res) => {
  res.render('finance_and_investments_form');
});

// CREATE FINANCE AND INVESTMENTS
app.post('/finance-and-investments/new', async (req, res) => {
  const newfinance_and_investments = new FinanceAndInvestment(req.body);
  await newfinance_and_investments.save((error) => {
    if (error)
      res.send('Sorry! Unsuccessful. Please Try Again.');
    else
      res.redirect('/finance-and-investments/new');
  });
});

// EDIT FINANCE AND INVESTMENTS
app.post('/finance-and-investments/edit', oidc.ensureAuthenticated(), (req, res) => {
  Product.updateOne({ _id: req.body._id }, req.body, { new: true }, (error) => {
    if (error)
      res.send('Sorry! Unsuccessful. Please Try Again.');
    else
      res.redirect('/finance-and-investments/new');
  });
});

/* --- EXTRACT REPORTS --- */

// LIST USERS (Suppliers)
app.get('/suppliers', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const suppliers = await User.find({ user: 'SUPPLIER' });
    res.render('suppliers', { suppliers });
  } catch (error) {
    res.status(400).send('Unable to find the list');
  }
});

// LIST USERS (Customers)
app.get('/customers', async (req, res) => {
  try {
    const customers = await User.find({ user: 'CUSTOMER' });
    res.json(customers);
  } catch (error) {
    res.status(400).send('Unable to find the list');
  }
});

// LIST PRODUCTS
app.get('/products', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// LIST DEBTORS
app.get('/debtors', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const debtors = await Transaction.find({ debtor: { $gt: 0 } }); // find where debtor > 0
    res.render('debtors', { debtors });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// MATCH USER (Proprietor, Supplier, Customer) TO TRANSACTIONS
app.get('/report/transactions', async (req, res) => {
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

// FINANCE AND INVESTMENTS SUMMARIZED
app.get('/report/finance-and-investments', async (req, res) => {
  try {
    const finance_and_investments = await FinanceAndInvestment.aggregate(
      [{
        "$group": {
          "_id": "",
          equity: { $sum: "$equity" },
          loan: { $sum: "$loan" },
          fixed_asset: { $sum: "$fixed_asset" },
          business_expense: { $sum: "$business_expense" },
          cash_withdrawn: { $sum: "$cash_withdrawn" }
        }
      }]
    );
    res.render('finance_and_investments_report', { finance_and_investments });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// CREDITOR, DEBTORS, GOODS WITHDRAWN SUMMARIZED
app.get('/report/operations', async (req, res) => {
  try {
    const transactions = await Transaction.aggregate(
      [{
        "$group": {
          "_id": "",
          creditor: { $sum: "$creditor" },
          debtor: { $sum: "$debtor" },
          goods_withdrawn: { $sum: "$goods_withdrawn" }
        }
      }]
    );
    res.render('operations_report', { transactions });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// TRADING ACTIVITIES SUMMARIZED
app.get('/report/trading', async (req, res) => {
  try {
    const products = await Product.aggregate(
      [{
        "$group": {
          "_id": "",
          net_purchases: { $sum: "$net_purchases" },
          net_sales: { $sum: "$net_sales" },
          closing_stock: { $sum: "$closing_stock" },
          cost_of_sales: { $sum: "$cost_of_sales" },
          gross_profit_or_loss: { $sum: "$gross_profit_or_loss" }
        }
      }]
    );
    res.render('trading_report', { products });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

/* --- LOGOUT CONTROLLER --- */

// LOGOUT ROUTE
app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

/* --- APP LISTEN TO REQUESTS --- */

oidc.on('ready', () => {
  app.listen(PORT, () => {
    console.log(`App running at port ${PORT}`);
  });
});

oidc.on('error', err => {
  console.error(err);
});