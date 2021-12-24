module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('product', {
    productName: {
      type: Sequelize.STRING,
    },
    category: {
      type: Sequelize.STRING,
    },
    source: {
      type: Sequelize.STRING,
    },
    retailPrice: {
      type: Sequelize.DECIMAL,
    },
    unitsPurchased: {
      type: Sequelize.INTEGER,
    },
    valuePurchased: {
      type: Sequelize.DECIMAL,
    },
    unitsSold: {
      type: Sequelize.INTEGER,
    },
    valueSold: {
      type: Sequelize.DECIMAL,
    },
    unitsInstock: {
      type: Sequelize.INTEGER,
    },
    valueInstock: {
      type: Sequelize.DECIMAL,
    },
    salesCost: {
      type: Sequelize.DECIMAL,
    },
    grossProfit: {
      type: Sequelize.DECIMAL,
    },
    discontinue: {
      type: Sequelize.STRING,
    },
  });
    // Note: using `force: true` will drop the table if it already exists
    // Now the `customers` table in the database corresponds to the model definition
  Product.sync({ force: true });
  return Product;
};
