// IMPORTING DEPENDENCIES
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

// SET HANDLEBARS AS VIEW TEMPLATE ENGINE
app.set('view engine', 'hbs');

/*
MULTIPLE STATIC DIRECTORIES
SERVING STATIC FILES WITH MIDDLEWARE FUNCTION express.static
*/
app.use(express.static('static/css'));
app.use(express.static('static/img'));
app.use(express.static('static/json'));
app.use(express.static('uploads'));

// MANIPULATE DATABASE USING JSON
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// ESTABLISHING DATABASE CONNECTION
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

// APP ROUTES
const operationRouter = require('./controllers/operation_routes');
const userRouter = require('./controllers/user_routes');
const productRouter = require('./controllers/product_routes');
const transactionRouter = require('./controllers/transaction_routes');
const paymentRouter = require('./controllers/payment_routes');
const orderRouter = require('./controllers/order_routes');
app.use(operationRouter);
app.use(userRouter);
app.use(productRouter);
app.use(transactionRouter);
app.use(paymentRouter);
app.use(orderRouter);

// LOGOUT ROUTE
app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

// SERVER LISTENING TO REQUESTS
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});