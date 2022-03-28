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
const items = require('./models/product_catalogue');
const Transaction = require('./models/transaction_model');
const Order = require('./models/order_model');
const Payment = require('./models/payment_model');
const financeAndInvestment = require('./models/financeAndInvestment_model');

/* --- USER CONTROLLERS --- */

// GET THE SUPPLIER FORM
app.get('/suppliers', oidc.ensureAuthenticated(), (req, res) => {
  res.render('supplier_form');
});

// GET THE CUSTOMER FORM
app.get('/customers', oidc.ensureAuthenticated(), (req, res) => {
  res.render('customer_form');
});

// CREATE NEW, OR UPDATE THE USER(SUPPLIER) BY ID
app.post('/suppliers', oidc.ensureAuthenticated(), (req, res) => {
  if (req.body._id == '')
    insertUser(req, res);
  else
    updateUser(req, res);
});

// CREATE NEW, OR UPDATE THE USER(CUSTOMER) BY ID
app.post('/customers', oidc.ensureAuthenticated(), (req, res) => {
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
  newuser.website = req.body.website;

  newuser.save((err) => {
    if (err)
      res.send('Unable to save the user; please try again.');
    else
      res.redirect('products/search');
  });
}

// FUNCTION TO UPDATE THE USER
const updateUser = (req, res) => {
  User.updateOne({ _id: req.body._id }, req.body, { new: true }, (err) => {
    if (err)
      res.send('Unable to save the user; please try again.');
  });
}

// LIST SUPPLIERS
app.get('/suppliers/list', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const suppliers = await User.find({ user: 'SUPPLIER' });
    res.render('list_suppliers', { suppliers });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// GET THE SUPPLIER BY ID
app.get('/suppliers/:id', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const supplier = await User.findOne({ _id: req.params.id });
    res.render('supplier_product_form', { supplier });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// MATCH USER(Proprietor, Supplier, Customer) TO TRANSACTIONS
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

// GET THE INDEX PAGE
app.get('/', async (req, res) => {
  try {
    const products = await Product.find({ category: req.query.category, discontinued: 'No' });
    res.render('index', { products, items });
  } catch (error) {
    res.status(400).send('index page closed; please try again.');
  }
});

// INSERT OR UPDATE THE PRODUCT BY ID
app.post('/products', oidc.ensureAuthenticated(), (req, res) => {
  if (req.body._id == '')
    insertProduct(req, res);
  else
    updateProduct(req, res);
});

// FUNCTION TO INSERT THE PRODUCT TO STORE
const insertProduct = (req, res) => {
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
app.get('/products/search', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const products = await Product.find({ product_name: req.query.product_name });
    res.render('search_product', { products });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// LIST PRODUCTS
app.get('/products/list', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// GET THE PRODUCT BY ID
app.get('/products/:id', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    const users = await axios.get('http://localhost:3000/users/transactions');
    res.render('product_form', { product, users: users.data });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

// GET THE PRODUCT BY ID -- changed route for orders placed Online.
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

// financeAndInvestmentS
app.get('/trading-profit-loss', async (req, res) => {
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
    res.render('trading_profit_loss', { products });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

/* --- TRANSACTION CONTROLLERS --- */

// INSERT OR UPDATE THE TRANSACTION BY ID
app.post('/transactions', oidc.ensureAuthenticated(), (req, res) => {
  if (req.body._id == '')
    insertTransaction(req, res);
  else
    updateTransaction(req, res);
});

// FUNCTION TO INSERT THE TRANSACTION
const insertTransaction = (req, res) => {
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

  newTransaction.save((err) => {
    if (err)
      res.send('Unable to save the transaction; please try again.');
  });
}

// FUNCTION TO UPDATE THE TRANSACTION
const updateTransaction = (req, res) => {
  Transaction.updateOne({ _id: req.body._id }, req.body, { new: true }, (err) => {
    if (err)
      res.send('Unable to save the transaction; please try again.');
    else
      res.redirect('transactions/debtors');
  });
}

// LIST DEBTORS
app.get('/transactions/debtors', oidc.ensureAuthenticated(), async (req, res) => {
  try {
    const debtors = await Transaction.find({ debtor: { $gt: 0 } }); // find where debtor > 0
    res.render('list_debtors', { debtors });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
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

// CREDITOR, DEBTORS, GOODS WITHDRAWN
app.get('/creditor-debtors-goodswithdrawn', async (req, res) => {
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
    res.render('creditor_debtors_goodsWithdrawn', { transactions });
  } catch (error) {
    res.status(400).send('Unable to find the record in the list');
  }
});

/* --- ORDER CONTROLLERS --- */

// PLACE YOUR ORDER
app.post('/orders', async (req, res) => {
  const newOrder = new Order(req.body);
  await newOrder.save((err) => {
    if (err)
      res.send('Dear customer, we have not received your order; please try again.');
    else
      res.redirect('/');
  });
});

/* --- PAYMENT CONTROLLERS --- */

// PAY OFF DEBT
app.post('/payments', oidc.ensureAuthenticated(), async (req, res) => {
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

/* --- FINANCE AND INVESTMENTS CONTROLLERS --- */

// GET THE financeAndInvestmentS FORM
app.get('/finance-and-investments', oidc.ensureAuthenticated(), (req, res) => {
  res.render('finance_and_investments');
});

// INSERT OR UPDATE financeAndInvestmentS BY ID
app.post('/finance-and-investments', oidc.ensureAuthenticated(), (req, res) => {
  if (req.body._id == '')
    insertfinanceAndInvestment(req, res);
  else
    updatefinanceAndInvestment(req, res);
});

// FUNCTION TO INSERT FINANCE AND INVESTMENTS
const insertfinanceAndInvestment = (req, res) => {
  const newfinanceInvestment = new financeAndInvestment();

  newfinanceInvestment.transaction_type = req.body.transaction_type;
  newfinanceInvestment.note = req.body.note;
  newfinanceInvestment.equity = req.body.equity;
  newfinanceInvestment.loan = req.body.loan;
  newfinanceInvestment.fixed_asset = req.body.fixed_asset;
  newfinanceInvestment.business_expense = req.body.business_expense;
  newfinanceInvestment.cash_withdrawn = req.body.cash_withdrawn;
  newfinanceInvestment.updated_on = req.body.updated_on;

  newfinanceInvestment.save((err) => {
    if (err)
      res.send('Unable to save the record; please try again.');
    else
      res.redirect('finance-investments');
  });
}

// FUNCTION TO UPDATE FINANCE AND INVESTMENTS
const updatefinanceAndInvestment = (req, res) => {
  financeAndInvestment.updateOne({ _id: req.body._id }, req.body, { new: true }, (err) => {
    if (err)
      res.send('Unable to save the record; please try again.');
    else
      res.redirect('finance-investments');
  });
}

// GET THE FINANCE AND INVESTMENTS BY ID


// FINANCE AND INVESTMENTS SUMMARIZED
app.get('/finance-investments', async (req, res) => {
  try {
    const financeInvestments = await financeAndInvestment.aggregate(
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
    res.render('finance_investments', { financeInvestments });
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