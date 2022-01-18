// IMPORTING DEPENDENCIES
require('dotenv').config();
const express = require('express');
//const multer = require('multer');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// SET PUG AS VIEW TEMPLATE ENGINE
app.set('view engine', 'hbs');
app.set('views', './views');

/*
MULTIPLE STATIC DIRECTORIES
SERVING STATIC FILES WITH MIDDLEWARE FUNCTION express.static
*/
app.use(express.static('static/css'));
app.use(express.static('static/js'));
app.use(express.static('static/img'));
app.use(express.static('static/json'));
app.use(express.static('uploads'));

// // STORE FOR UPLOADED FILES
// const storage = multer.diskStorage({
//   destination(req, file, callback) {
//     callback(null, './uploads');
//   },
//   filename(req, file, callback) {
//     callback(null, file.originalname);
//   },
// });

// const upload = multer({ storage }).single('file');

// // UPLOAD FILE
// app.post('/uploads', (req, res) => {
//   // eslint-disable-next-line consistent-return
//   upload(req, res, (err) => {
//     if (err) {
//       return res.end('file not uploaded');
//     }
//     res.end('uploaded file successfully');
//   });
// });

// MANIPULATE DATABASE USING JSON
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// ESTABLISHING DATABASE CONNECTION
mongoose.connect(process.env.DATABASE, {
  //useCreateIndex: true,
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
//const supplierRouter = require('./controllers/supplier_routes');
//const purchaseRouter = require('./controllers/purchase_routes');
const productRouter = require('./controllers/product_routes');
//const customerRouter = require('./controllers/customer_routes');
//const saleRouter = require('./controllers/sale_routes');
//const accountRouter = require('./controllers/account_routes');

//app.use(supplierRouter);
//app.use(purchaseRouter);
app.use(productRouter);
//app.use(customerRouter);
//app.use(saleRouter);
//app.use(accountRouter);

// SERVER LISTENING TO REQUESTS
app.listen(3000, () => {
  console.log('listening on port 3000');
});
