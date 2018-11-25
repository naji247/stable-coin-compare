const csv = require('csvtojson');

module.exports = {
  up: (queryInterface, Sequelize) =>
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    csv()
      .fromFile(
        '/Users/naseemal-naji/Projects/stable-coin-compare/cleanedCoinsData.csv'
      )
      .then(async lines => {
        let buffer = [];
        for (const row of lines) {
          row.market_cap = 0;
          row.volume = 0;
          buffer.push(row);
          if (buffer.length === 10000) {
            await queryInterface.bulkInsert('coin_history', buffer, {});
            buffer = [];
          }
        }
        await queryInterface.bulkInsert('coin_history', buffer, {});
        return true;
      }),
  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('coin_history', null, {});
  }
};
