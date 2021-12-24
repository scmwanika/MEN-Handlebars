const Sequelize = require('sequelize');
const Config = require('./db');

const sequelize = new Sequelize(Config.DB, Config.USER, Config.PASSWORD, {
  host: Config.HOST,
  dialect: Config.DIALECT,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// DATABASE TABLES
db.accounts = require('./models/accountModel')(sequelize, Sequelize);
db.suppliers = require('./models/supplierModel')(sequelize, Sequelize);
db.purchases = require('./models/purchaseModel')(sequelize, Sequelize);
db.products = require('./models/productModel')(sequelize, Sequelize);
db.customers = require('./models/customerModel')(sequelize, Sequelize);
db.sales = require('./models/saleModel')(sequelize, Sequelize);

// OTHER TABLES NOT PART OF THIS APP
// db.users = require('./models/userModel')(sequelize, Sequelize);
// db.books = require('./models/bookModel')(sequelize, Sequelize);

module.exports = db;
