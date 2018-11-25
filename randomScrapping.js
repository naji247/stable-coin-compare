const request = require('request-promise');
const moment = require('moment');
const coins = require('/Users/naseemal-naji/Projects/stable-coin-compare/src/stablecoinInfo.json');
const _ = require('lodash');
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const csv = require('csvtojson');

const csvWriter = createCsvWriter({
  header: ['COIN', 'DATE', 'PRICE'],
  path: 'coinsData.csv',
  append: true
});
const missedWriter = createCsvWriter({
  header: ['MISSED', 'ERROR'],
  path: 'missedUrls2.csv',
  append: true
});

const inputDate = moment().subtract(1816080, 'seconds');
const currDate = moment().unix() * 1000;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchDataFromCsv(dryRun) {
  const csvLines = await csv({ noheader: true }).fromFile(
    '/Users/naseemal-naji/Projects/stable-coin-compare/missedUrls1.csv'
  );
  const missedUrls = Object.values(csvLines).map(obj => obj.field1);
  for (const url of missedUrls) {
    let counter = 0;

    let coin = url.split('/')[4];
    if (dryRun) {
      console.log(url);
    } else {
      console.log(url);
      try {
        const resp = await request({
          url,
          credentials: 'omit',
          headers: {
            accept: 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'en-US,en;q=0.9,tr;q=0.8',
            'cache-control': 'no-cache',
            pragma: 'no-cache'
          },
          json: true,
          method: 'GET'
        });

        counter++;

        if (resp.price_usd) {
          const formattedPrices = resp.price_usd.map(dateAndPrice => [
            coin,
            moment(dateAndPrice[0]).toISOString(),
            dateAndPrice[1]
          ]);
          console.log(formattedPrices);
          await csvWriter.writeRecords(formattedPrices);
          await sleep(1000);
        }
      } catch (e) {
        if (e && e.response && e.response.statusCode) {
          const wait = e.response.headers['retry-after'] * 1000;
          console.log(`Wait is ${wait}, made it to ${counter} attempts.`);
          counter = 0;
          await missedWriter.writeRecords([[url, e.response.statusCode]]);
          await sleep(wait + 3000);
        } else {
          console.log(JSON.stringify(e));
        }
      }
    }
  }
}

async function fetchData(startDate, batchPeriodInDays, dryRun) {
  for (const coin of Object.values(coins)) {
    if (!coin.isLive) {
      continue;
    }
    console.log(coin);
    const date = new Date(coin.liveDate);
    const liveDate = moment(date);
    const initDate = startDate || liveDate;
    const timeInBetween = moment().unix() - initDate.unix();
    const secondsPerDay = 60 * 60 * 24;
    const timeInBetweenInDays = timeInBetween / secondsPerDay;
    const datesToQuery = [];

    for (let i = 0; i < timeInBetweenInDays; i++) {
      datesToQuery.push(
        moment(initDate.unix() * 1000).add(i * secondsPerDay, 'seconds')
      );
    }

    datesToQuery.push(moment());

    let counter = 0;
    for (const [index, dateI] of datesToQuery.entries()) {
      if (index == datesToQuery.length - 1) {
        break;
      }
      const url = `https://graphs2.coinmarketcap.com/currencies/${
        coin.coinMarketCapId
      }/${datesToQuery[index].unix() * 1000}/${datesToQuery[index + 1].unix() *
        1000}/`;
      console.log(url);
      if (dryRun) {
        console.log(url);
      } else {
        try {
          const resp = await request({
            url,
            credentials: 'omit',
            headers: {
              accept: 'application/json, text/javascript, */*; q=0.01',
              'accept-language': 'en-US,en;q=0.9,tr;q=0.8',
              'cache-control': 'no-cache',
              pragma: 'no-cache'
            },
            json: true,
            // referrer: 'https://coinmarketcap.com/currencies/bitcoin/',
            // referrerPolicy: 'no-referrer-when-downgrade',
            // body: null,
            method: 'GET'
          });

          counter++;

          if (resp.price_usd) {
            const formattedPrices = resp.price_usd.map(dateAndPrice => [
              coin.id,
              moment(dateAndPrice[0]).toISOString(),
              dateAndPrice[1]
            ]);
            console.log(formattedPrices);
            await csvWriter.writeRecords(formattedPrices);
            await sleep(1000);
          }
        } catch (e) {
          if (e && e.response && e.response.statusCode) {
            const wait = e.response.headers['retry-after'] * 1000;
            console.log(`Wait is ${wait}, made it to ${counter} attempts.`);
            counter = 0;
            await missedWriter.writeRecords([[url, e.response.statusCode]]);
            await sleep(wait + 3000);
          } else {
            console.log(JSON.stringify(e));
          }
        }
      }
    }
  }
}

fetchDataFromCsv(false);
// fetchData(null, 1, false);
