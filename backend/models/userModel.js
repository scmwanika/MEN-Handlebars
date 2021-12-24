// const bookModel = require('./bookModel');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  });
  User.associate = (models) => {
    // Defining Association
    User.hasMany(models.bookModel, { foreignKey: 'userId' });
  };
  // Note: using `force: true` will drop the table if it already exists
  // Now the `users` table in the database corresponds to the model definition
  User.sync({ force: true });
  return User;
};
