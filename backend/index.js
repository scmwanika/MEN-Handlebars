// IMPORTING DEPENDENCIES
require('dotenv').config();
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

// SERVING STATIC FILES WITH MIDDLEWARE FUNCTION express.static
app.use(express.static('uploads'));

// STORE FOR UPLOADED FILES
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './uploads');
  },
  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage }).single('file');

// UPLOAD FILE
app.post('/uploads', (req, res) => {
  // eslint-disable-next-line consistent-return
  upload(req, res, (err) => {
    if (err) {
      return res.end('file not uploaded');
    }
    res.end('uploaded file successfully');
  });
});

// MANIPULATE DATABASE USING JSON
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// APP ROUTES
const supplierRouter = require('./controllers/supplierRoutes');
const purchaseRouter = require('./controllers/purchaseRoutes');
const productRouter = require('./controllers/productRoutes');
const customerRouter = require('./controllers/customerRoutes');
const saleRouter = require('./controllers/saleRoutes');
const accountRouter = require('./controllers/accountRoutes');

app.use(supplierRouter);
app.use(purchaseRouter);
app.use(productRouter);
app.use(customerRouter);
app.use(saleRouter);
app.use(accountRouter);

// SERVER LISTENING TO REQUESTS
app.listen(3000, () => {
  console.log('listening on port 3000');
});
