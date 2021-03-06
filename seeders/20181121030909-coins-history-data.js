const csv = require('csvtojson');

module.exports = {
  up: (queryInterface, Sequelize) =>
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    csv()
      .fromFile('./cleanedCoinsData.csv')
      .then(async lines => {
        let buffer = [];
        for (const row of lines) {
          buffer.push(row);
          if (buffer.length === 10000) {
            await queryInterface.bulkInsert('coin_history', buffer, {});
            buffer = [];
          }
        }
        await queryInterface.bulkInsert('coin_history', buffer, {});
        return true;
      }).catch(e => {
        console.log(e);
        console.log(`If there's a missing file error, you need to change the path to cleanedCoinsData.csv`);
    }),
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('coin_history', null, {});
  }
};
