module.exports = (sequelize, Sequelize) => {
  const Supplier = sequelize.define('supplier', {
    supplierName: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    street: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    telephone: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    website: {
      type: Sequelize.STRING,
    },
  });
    // Note: using `force: true` will drop the table if it already exists
    // Now the `suppliers` table in the database corresponds to the model definition
  Supplier.sync({ force: true });
  return Supplier;
};
