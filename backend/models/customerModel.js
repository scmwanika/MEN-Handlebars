module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define('customer', {
    customerName: {
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
    // Now the `customers` table in the database corresponds to the model definition
  Customer.sync({ force: true });
  return Customer;
};
