module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define('book', {
    userId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: { model: 'users', key: 'id', as: 'userId' },
    },
    title: {
      type: Sequelize.STRING,
    },
    author: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    quantity: {
      type: Sequelize.STRING,
    },
  });
  Book.associate = (models) => {
    // Defining Association
    Book.belongsTo(models.userModel, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };
  // Note: using `force: true` will drop the table if it already exists
  // Now the `books` table in the database corresponds to the model definition
  Book.sync({ force: true });
  return Book;
};
