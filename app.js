// IMPORTING DEPENDENCIES
const { default: axios } = require('axios');
const express = require('express');
const session = require('express-session');
const ExpressOIDC = require('@okta/oidc-middleware').ExpressOIDC;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

// HANDLEBARS THE VIEW TEMPLATE ENGINE
app.set('view engine', 'hbs');

// SERVING MULTIPLE STATIC DIRECTORIES WITH MIDDLEWARE FUNCTION express.static
app.use(express.static('static/css'));
app.use(express.static('static/img'));
app.use(express.static('uploads'));

// MANIPULATE DATABASE USING JSON
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// CONNECT DATABASE
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (error) => {
    console.log(`Connection error: ${error.message}`);
  });

// USER SESSION
app.use(session({
  cookie: { httpOnly: true },
  secret: `${process.env.OKTA_CLIENT_SECRET}`,
  resave: true,
  saveUninitialized: false
}));

// AUTHENTICATE USER
const oidc = new ExpressOIDC({
  appBaseUrl: `${process.env.HOST_URL}`,
  issuer: `${process.env.OKTA_ORG_URL}`,
  client_id: process.env.OKTA_CLIENT_ID,
  client_secret: process.env.OKTA_CLIENT_SECRET,
  scope: 'openid profile email'
});

app.use(oidc.router);

// IMPORT MODELS
const User = require('./models/user_model');
const Product = require('./models/product_model');
const items = require('./json/product_catalogue');
const Transaction = require('./models/transaction_model');
const Order = require('./models/order_model');
const Payment = require('./models/payment_model');
const FinanceAndInvestment = require('./models/finance_and_investment_model');

/* --- USER CONTROLLERS --- */

// CREATE NEW USER (Supplier or Customer)
const createUser = (req, res) => {
  const newuser = new User();

  newuser.user = req.body.user;
  newuser.name = req.body.name;
  newuser.country = req.body.country;
  newuser.city = req.body.city;
  newuser.street = req.body.street;
  newuser.address = req.body.address;
  newuser.telephone = req.body.telephone;
  newuser.email = req.body.email;
  newuser.website = req.body.website;

  newuser.save()
    //.then(() => { res.send('Your entry is saved in the database.'); })
    .catch((error) => {
      console.log(error);
      res.send('Sorry! Your entry was not saved in the database.');
    });
}

// UPDATE THE USER BY ID (Supplier or Customer)
const updateUser = (req, res) => {
  User.updateOne({ _id: req.body._id }, req.body, { new: true }, (error) => {
    if (error)
      res.send('Unable to update the user; Please Try Again.');
  });
}

// GET AND FILL IN THE FORM (Supplier)
app.get('/suppliers/new', oidc.ensureAuthenticated(), (req, res) => {
  res.render('supplier_form');
});

// GET AND FILL IN THE FORM (Customer)
app.get('/customers/new', oidc.ensureAuthenticated(), (req, res) => {
  res.render('customer_form');
});

// CREATE OR UPDATE THE USER BY ID (Supplier)
app.post('/suppliers/new', oidc.ensureAuthenticated(), (req, res) => {
  if (req.body._id == '')
    createUser(req, res);
  else
    updateUser(req, res);
});

// CREATE OR UPDATE THE USER BY ID (Customer)
app.post('/customers/new', oidc.ensureAuthenticated(), (req, res) => {
  if (req.body._id == '')
    createUser(req, res);
  else
    updateUser(req, res);
});

// LIST USERS (Suppliers)
app.get('/suppliers', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const suppliers = await User.find({ user: 'SUPPLIER' });
    res.render('suppliers', { suppliers });
  } catch (error) {
    res.status(400).send('Unable to find the list');
  }
});

// GET THE USER BY ID (Supplier)
app.get('/suppliers/:id', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const supplier = await User.findOne({ _id: req.params.id });
    res.render('supplies_form', { supplier });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// MATCH USER (Proprietor, Supplier, Customer) TO TRANSACTIONS
app.get('/users/transactions', async (req, res) => {
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

/* --- PRODUCT CONTROLLERS --- */

// STOCK THE PRODUCT
const createProduct = (req, res) => {
  const newProduct = new Product();

  newProduct.user_id = req.body.user_id;
  newProduct.product_name = req.body.product_name;
  newProduct.category = req.body.category;
  newProduct.retail_price = req.body.retail_price;
  newProduct.quantity_purchased = req.body.units_purchased;
  newProduct.net_purchases = req.body.net_purchases;
  newProduct.quantity_sold = req.body.units_sold;
  newProduct.net_sales = req.body.net_sales;
  newProduct.quantity_instock = req.body.units_instock;
  newProduct.closing_stock = req.body.closing_stock;
  newProduct.cost_of_sales = req.body.cost_of_sales;
  newProduct.gross_profit_or_loss = req.body.gross_profit_or_loss;
  newProduct.discontinued = req.body.discontinued;
  newProduct.created_on = req.body.created_on;
  newProduct.updated_on = req.body.updated_on;

  newProduct.save()
    //.then(() => { res.send('Your entry is saved in the database.'); })
    .catch((error) => {
      console.log(error);
      res.send('Sorry! Your entry was not saved in the database.');
    });
}

// UPDATE THE PRODUCT BY ID
const updateProduct = (req, res) => {
  Product.updateOne({ _id: req.body._id }, req.body, { new: true }, (error) => {
    if (error)
      res.send('Unable to save the product; Please Try Again.');
  });
}

// DISPLAY THE PRODUCT CATALOGUE
app.get('/', async (req, res) => {
  try {
    // retrieve products that are not discontinued; search by category
    const products = await Product.find({ category: req.query.category, discontinued: 'No' });
    res.render('index', { products, items });
  } catch (error) {
    res.status(400).send('index page closed; please try again.');
  }
});

// CREATE OR UPDATE THE PRODUCT BY ID
app.post('/products/new', oidc.ensureAuthenticated(), (req, res) => {
  if (req.body._id == '')
    createProduct(req, res);
  else
    updateProduct(req, res);
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

// LIST PRODUCTS
app.get('/products', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// GET THE PRODUCT BY ID (Transactions)
app.get('/products/:id', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    const users = await axios.get('http://localhost:3000/users/transactions');
    res.render('product_form', { product, users: users.data });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// GET THE PRODUCT BY ID (Orders online)
app.get('/items/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.render('order_form', { product });
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

// TRADING REPORT
app.get('/trading-report', async (req, res) => {
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

/* --- TRANSACTION CONTROLLERS --- */

// CREATE THE TRANSACTION
const createTransaction = (req, res) => {
  const newTransaction = new Transaction();

  newTransaction.userId = req.body.userId;
  newTransaction.transaction_type = req.body.transaction_type;
  newTransaction.product = req.body.product;
  newTransaction.quantity = req.body.quantity;
  newTransaction.unit_cost = req.body.unit_cost;
  newTransaction.total_cost = req.body.total_cost;
  newTransaction.payment = req.body.payment;
  newTransaction.initial_payment = req.body.initial_payment;
  newTransaction.creditor = req.body.creditor;
  newTransaction.debtor = req.body.debtor;
  newTransaction.goods_withdrawn = req.body.goods_withdrawn;
  newTransaction.transaction_date = req.body.transaction_date;

  newTransaction.save()
    //.then(() => { res.send('Your entry is saved in the database.'); })
    .catch((error) => {
      console.log(error);
      res.send('Sorry! Your entry was not saved in the database.');
    });
}

// UPDATE THE TRANSACTION
const updateTransaction = (req, res) => {
  Transaction.updateOne({ _id: req.body._id }, req.body, { new: true }, (error) => {
    if (error)
      res.send('Unable to save the transaction; Please Try Again.');
  });
}

// CREATE OR UPDATE THE TRANSACTION BY ID
app.post('/transactions/new', oidc.ensureAuthenticated(), (req, res) => {
  if (req.body._id == '')
    createTransaction(req, res);
  else
    updateTransaction(req, res);
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

// LIST DEBTORS
app.get('/debtors', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const debtors = await Transaction.find({ debtor: { $gt: 0 } }); // find where debtor > 0
    res.render('debtors', { debtors });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// CREDITOR, DEBTORS, GOODS WITHDRAWN
app.get('/operations-report', async (req, res) => {
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

/* --- ORDER CONTROLLERS --- */

// PLACE YOUR ORDER
app.post('/orders/new', async (req, res) => {
  const newOrder = new Order(req.body);
  await newOrder.save((error) => {
    if (error)
      res.send('Dear Customer; sorry, we have not received your order. Please Try Again.');
    else
      res.redirect('/');
  });
});

/* --- PAYMENT CONTROLLERS --- */

// PAY OFF DEBT
app.post('/payments/new', oidc.ensureAuthenticated(), async (req, res) => {
  const newPayment = new Payment(req.body);
  await newPayment.save()
    //.then(() => { res.send('Your entry is saved in the database.'); })
    .catch((error) => {
      console.log(error);
      res.send('Sorry! Your entry was not saved in the database.');
    });
});

/* --- FINANCE AND INVESTMENTS CONTROLLERS --- */

// CREATE FINANCE AND INVESTMENTS
const createFinanceAndInvestment = (req, res) => {
  const newfinanceInvestment = new FinanceAndInvestment();

  newfinanceInvestment.transaction_type = req.body.transaction_type;
  newfinanceInvestment.note = req.body.note;
  newfinanceInvestment.equity = req.body.equity;
  newfinanceInvestment.loan = req.body.loan;
  newfinanceInvestment.fixed_asset = req.body.fixed_asset;
  newfinanceInvestment.business_expense = req.body.business_expense;
  newfinanceInvestment.cash_withdrawn = req.body.cash_withdrawn;
  newfinanceInvestment.updated_on = req.body.updated_on;

  newfinanceInvestment.save()
    //.then(() => { res.send('Your entry is saved in the database.'); })
    .catch((error) => {
      console.log(error);
      res.send('Sorry! Your entry was not saved in the database.');
    });
}

// UPDATE FINANCE AND INVESTMENTS
const updateFinanceAndInvestment = (req, res) => {
  FinanceAndInvestment.updateOne({ _id: req.body._id }, req.body, { new: true }, (error) => {
    if (error)
      res.send('Unable to save your entry; Please Try Again.');
  });
}

// GET THE FINANCE AND INVESTMENTS FORM
app.get('/finance-and-investments/new', oidc.ensureAuthenticated(), (req, res) => {
  res.render('finance_and_investments_form');
});

// CREATE OR UPDATE FINANCE AND INVESTMENTS BY ID
app.post('/finance-and-investments/new', oidc.ensureAuthenticated(), (req, res) => {
  if (req.body._id == '')
    createFinanceAndInvestment(req, res);
  else
    updateFinanceAndInvestment(req, res);
});

// GET THE FINANCE AND INVESTMENTS BY ID
/* code here */

// FINANCE AND INVESTMENTS SUMMARIZED
app.get('/finance-and-investments-report', async (req, res) => {
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

/* --- LOGOUT CONTROLLER --- */

// LOGOUT ROUTE
app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

// APP LISTEN TO REQUESTS
oidc.on('ready', () => {
  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
});

oidc.on('error', err => {
  console.error(err);
});