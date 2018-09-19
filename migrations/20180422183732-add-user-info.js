'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('user', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID,
        primaryKey: true,
      },

      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING(255),
        validate: { isEmail: true },
        unique: true,
      },

      email_confirmed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      first_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      last_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      phone_number: {
        type: Sequelize.STRING(20),
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('user'),
};
