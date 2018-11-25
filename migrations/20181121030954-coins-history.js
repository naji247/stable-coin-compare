module.exports = {
  up: (queryInterface, Sequelize) =>
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() =>
        queryInterface.createTable('coin_history', {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
            primaryKey: true
          },

          coin_id: {
            type: Sequelize.STRING(255),
            allowNull: false
          },

          price: {
            type: Sequelize.FLOAT,
            allowNull: false
          },

          market_cap: {
            type: Sequelize.FLOAT,
            allowNull: false
          },

          volume: {
            type: Sequelize.FLOAT,
            allowNull: false
          },

          timestamp: {
            allowNull: false,
            type: Sequelize.DATE
          }
        })
      ),
  down: (queryInterface, Sequelize) =>
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    queryInterface.dropTable('coin_history')
};
