module.exports = (sequelize, Sequelize) => {
  const Purchase = sequelize.define('purchase', {
    unitsPurchased: {
      type: Sequelize.INTEGER,
    },
    unitCost: {
      type: Sequelize.DECIMAL,
    },
    totalCost: {
      type: Sequelize.DECIMAL,
    },
    note: {
      type: Sequelize.STRING,
    },
  });
    // Note: using `force: true` will drop the table if it already exists
    // Now the `customers` table in the database corresponds to the model definition
  Purchase.sync({ force: true });
  return Purchase;
};
