// IMPORTING DEPENDENCIES
const { default: axios } = require("axios");
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const { DATABASE, PORT } = process.env;

const app = express();

// HANDLEBARS THE VIEW TEMPLATE ENGINE
app.set("view engine", "hbs");

// SERVING MULTIPLE STATIC DIRECTORIES WITH MIDDLEWARE FUNCTION express.static
app.use(express.static("static/img"));
app.use(express.static("uploads"));

// CONFIGURE FILE UPLOAD
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: storage }).single("photo");

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
  .on("open", () => {
    console.log("Database successfully connected");
  })
  .on("error", (error) => {
    console.log(`Sorry! Database disconnected: ${error.message}`);
  });

// IMPORT MODELS
const User = require("./models/user_model");
const Product = require("./models/product_model");
const items = require("./json/product_catalogue");
const Transaction = require("./models/transaction_model");
const Payment = require("./models/payment_model");
const Bookkeeping = require("./models/bookkeeping_model");

/* --- USER CONTROLLERS --- */

// GET AND FILL IN THE USER (Supplier)
app.get("/suppliers/new", (req, res) => {
  res.render("supplier_form");
});

// CREATE USER (Supplier)
app.post("/suppliers/new", async (req, res) => {
  try {
    const newSupplier = new User(req.body);
    await newSupplier.save();

    res.redirect("/suppliers");
  } catch (error) {
    res.send("Sorry! unable to save; please try again.");
  }
});

// EDIT USER (Supplier)
app.post("/suppliers/edit", async (req, res) => {
  try {
    await User.updateOne({ _id: req.body._id }, req.body, { new: true });

    res.redirect("/suppliers");
  } catch (error) {
    res.send("Sorry! unable to save; please try again.");
  }
});

// GET THE USER (Supplier) BY ID
app.get("/suppliers/:id", async (req, res) => {
  try {
    const supplier = await User.findOne({ _id: req.params.id });
    res.render("supplies_form", { supplier, items });
  } catch (error) {
    res.status(400).send("Unable to find the record in the list");
  }
});

// GET AND FILL IN THE USER (Customer)
app.get("/customers/new", (req, res) => {
  res.render("customer_form");
});

// CREATE USER (Customer)
app.post("/customers/new", async (req, res) => {
  try {
    const newCustomer = new User(req.body);
    await newCustomer.save();

    res.redirect("/products/search");
  } catch (error) {
    res.send("Sorry! unable to save; please try again.");
  }
});

/* --- PRODUCT CONTROLLERS --- */

// SHOP ONLINE
app.get("/", async (req, res) => {
  try {
    // search by category and retrieve products not discontinued
    const products = await Product.find({
      category: req.query.category,
      discontinued: "NO",
    });
    //
    const items = await axios.get("http://localhost:3000/items");

    res.render("index", { products, items: items.data });
  } catch (error) {
    res.status(400).send("index page closed; please try again.");
  }
});

// UPLOAD FILE (Product)
app.post("/uploads", (req, res) => {
  upload(req, res, (error) => {
    if (error) {
      return res.end("Sorry! Unsuccessful. Please Try Again.");
    }
  });
});

// CREATE PRODUCT
app.post("/products/new", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    res.redirect("/products/search");
  } catch (error) {
    res.send("Sorry! unable to save; please try again.");
  }
});

// EDIT PRODUCT
app.post("/products/edit", async (req, res) => {
  try {
    await Product.updateOne({ _id: req.body._id }, req.body, { new: true });

    res.redirect("/products/search");
  } catch (error) {
    res.send("Sorry! unable to save; please try again.");
  }
});

// SEARCH THE PRODUCT BY NAME
app.get("/products/search", async (req, res) => {
  try {
    const products = await Product.find({
      product_name: req.query.product_name,
    });
    //
    const items = await axios.get("http://localhost:3000/items");

    res.render("search_product", { products, items: items.data });
  } catch (error) {
    res.status(400).send("Unable to find the record in the list");
  }
});

// DELETE THE PRODUCT BY ID
app.get("/products/delete/:id", async (req, res) => {
  try {
    const product = await Product.deleteOne({ _id: req.params.id });

    res.render("search_product", { product });
  } catch (error) {
    res.status(400).send("Unable to delete the record from the database");
  }
});

// GET THE PRODUCT BY ID (Purchases)
app.get("/purchases/products/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });

    res.render("purchase_product", { product });
  } catch (error) {
    res.status(400).send("Unable to find the record in the list");
  }
});

// GET THE PRODUCT BY ID (Sales)
app.get("/sales/products/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    const customers = await axios.get("http://localhost:3000/customers");

    res.render("sale_product", { product, customers: customers.data });
  } catch (error) {
    res.status(400).send("Unable to find the record in the list");
  }
});

// GET THE PRODUCT BY ID (Goods Withdrawn)
app.get("/drawings/products/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });

    res.render("withdraw_product", { product });
  } catch (error) {
    res.status(400).send("Unable to find the record in the list");
  }
});

// GET THE PRODUCT BY ID (Product Catalogue)
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });

    res.render("order_form", { product });
  } catch (error) {
    res.status(400).send("Unable to find the record in the list");
  }
});

/* --- TRANSACTION CONTROLLERS --- */

// CREATE TRANSACTION
app.post("/transactions/new", async (req, res) => {
  const newTransaction = new Transaction(req.body);
  await newTransaction.save((error) => {
    if (error) res.send("Sorry! Unsuccessful. Please Try Again.");
  });
});

// EDIT TRANSACTION
app.post("/transactions/edit", async (req, res) => {
  try {
    await Transaction.updateOne({ _id: req.body._id }, req.body, { new: true });

    res.redirect("/debtors");
  } catch (error) {
    res.send("Sorry! unable to save; please try again.");
  }
});

// GET THE TRANSACTION BY ID
app.get("/transactions/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id });

    res.render("payment_form", { transaction });
  } catch (error) {
    res.status(400).send("Unable to find the record in the list");
  }
});

/* --- PAYMENT CONTROLLERS --- */

// PAY OFF DEBT
app.post("/payments/new", async (req, res) => {
  const newPayment = new Payment(req.body);
  await newPayment.save((error) => {
    if (error) res.send("Sorry! Unsuccessful. Please Try Again.");
  });
});

/* --- BOOKKEEPING CONTROLLERS --- */

// GET THE BOOKKEEPING FORM
app.get("/bookkeeping/new", (req, res) => {
  res.render("bookkeeping_form");
});

// CREATE RECORDS (BOOKKEEPING)
app.post("/bookkeeping/new", async (req, res) => {
  try {
    const newfinance_and_investments = new Bookkeeping(req.body);
    await newfinance_and_investments.save();

    res.redirect("/bookkeeping/new");
  } catch (error) {
    res.send("Sorry! unable to save; please try again.");
  }
});

// EDIT THE RECORDS
app.post("/bookkeeping/edit", async (req, res) => {
  await Bookkeeping.updateOne(
    { _id: req.body._id },
    req.body,
    { new: true },
    (error) => {
      if (error) res.send("Sorry! Unsuccessful. Please Try Again.");
      else res.redirect("/bookkeeping/new");
    }
  );
});

/* --- EXTRACT REPORTS --- */

// LIST USERS (Suppliers)
app.get("/suppliers", async (req, res) => {
  try {
    const suppliers = await User.find({ group: "SUPPLIER" });

    res.render("suppliers", { suppliers });
  } catch (error) {
    res.status(400).send("Unable to find the list");
  }
});

// LIST USERS (Customers)
app.get("/customers", async (req, res) => {
  try {
    const customers = await User.find({ group: "CUSTOMER" });

    res.json(customers);
  } catch (error) {
    res.status(400).send("Unable to find the list");
  }
});

// LIST PRODUCTS (items)
app.get("/items", async (req, res) => {
  try {
    const items = await Product.find();

    res.json(items);
  } catch (error) {
    res.status(400).send("Unable to find the list");
  }
});

// LIST DEBTORS
app.get("/debtors", async (req, res) => {
  try {
    const debtors = await Transaction.find({ debtor: { $gt: 0 } }); // find where debtor > 0

    res.render("debtors", { debtors });
  } catch (error) {
    res.status(400).send("Unable to find the record in the list");
  }
});

// MATCH USER (Proprietor, Supplier, Customer) TO TRANSACTIONS
app.get("/report/transactions", async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: "transactions",
          localField: "_id",
          foreignField: "userId",
          as: "transaction_details",
        },
      },
    ]);

    res.json(users);
  } catch (error) {
    res.status(400).send("Unable to find the record in the list");
  }
});

// SUMMARIES
app.get("/summaries", async (req, res) => {
  try {
    // Trading Account
    const products = await Product.aggregate([
      {
        $group: {
          _id: "",
          net_purchases: { $sum: "$net_purchases" },
          net_sales: { $sum: "$net_sales" },
          closing_stock: { $sum: "$closing_stock" },
          cost_of_sales: { $sum: "$cost_of_sales" },
          gross_profit_or_loss: { $sum: "$gross_profit_or_loss" },
        },
      },
    ]);
    // Creditor, Debtors, Goods Drawn
    const transactions = await Transaction.aggregate([
      {
        $group: {
          _id: "",
          creditors: { $sum: "$creditor" },
          debtors: { $sum: "$debtor" },
          goods_drawn: { $sum: "$goods_drawn" },
        },
      },
    ]);
    // Equities, Loans, Fixed Assets, Business Expenses, Cash Drawn
    const bookkeepings = await Bookkeeping.aggregate([
      {
        $group: {
          _id: "",
          equities: { $sum: "$equity" },
          loans: { $sum: "$loan" },
          fixed_assets: { $sum: "$fixed_asset" },
          business_expenses: { $sum: "$business_expense" },
          cash_drawn: { $sum: "$cash_drawn" },
        },
      },
    ]);

    res.render("summaries_report", {
      products,
      transactions,
      bookkeepings,
    });
  } catch (error) {
    res.status(400).send("Unable to find the record in the list");
  }
});

/* --- LOGOUT CONTROLLER --- */

// LOGOUT ROUTE
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

/* --- APP LISTEN TO REQUESTS --- */

app.listen(PORT, () => {
  console.log(`App running at port ${PORT}`);
});
