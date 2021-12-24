module.exports = (sequelize, Sequelize) => {
  const Account = sequelize.define('account', {
    accountName: {
      type: Sequelize.STRING,
    },
    amount: {
      type: Sequelize.DECIMAL,
    },
    note: {
      type: Sequelize.STRING,
    },
  });
    // Note: using `force: true` will drop the table if it already exists
    // Now the `accounts` table in the database corresponds to the model definition
  Account.sync({ force: true });
  return Account;
};
