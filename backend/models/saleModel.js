module.exports = (sequelize, Sequelize) => {
  const Sale = sequelize.define('sale', {
    orderBy: {
      type: Sequelize.STRING,
    },
    productName: {
      type: Sequelize.STRING,
    },
    unitsSold: {
      type: Sequelize.INTEGER,
    },
    unitPrice: {
      type: Sequelize.DECIMAL,
    },
    totalPrice: {
      type: Sequelize.DECIMAL,
    },
    note: {
      type: Sequelize.STRING,
    },
  });
    // Note: using `force: true` will drop the table if it already exists
    // Now the `customers` table in the database corresponds to the model definition
  Sale.sync({ force: true });
  return Sale;
};
