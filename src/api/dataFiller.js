import CoinHistory from '../data/models/CoinHistory';
import sequelize from '../data/sequelize';
import stablecoinJson from '../stablecoinInfo.json';
import request from 'request-promise';
import co from 'co';
import moment from "moment";
import _ from 'lodash';
const secondsPerDay = 60 * 60 * 24;



export default class CoinMarketCapDataFiller {
  COINMARKETCAP_REQUESTS_PER_SECOND = .3;
  fetchLiveCoins = (stablecoinJson) =>
    Object.values(stablecoinJson).filter(coinData => coinData.isLive);

  fetchLatestCoin = async coinId => {
    const SQL_STRING = `SELECT * FROM coin_history WHERE coin_id = '${coinId}' ORDER BY timestamp DESC LIMIT 1;`;
    const row = await sequelize.query(SQL_STRING, { type: sequelize.QueryTypes.SELECT }).then(rows => _.first(rows));
    if (!row) {throw new Error(`No row found for coin id ${coinId} while fetching latest coin history.`)}
    return row;
  };

  formatListOfDatePairsForCoinMarketCap = listOfPairs => listOfPairs.map(pair => [pair[0] * 1000, pair[1] * 1000]);

  fetchListOfRemainingDatesToQuery = timestamp => {
    const lastQueriedTimestamp = moment(timestamp).unix();
    const currentTime = moment().unix();
    const timeInBetweenInDays = (currentTime - lastQueriedTimestamp) / secondsPerDay;

    const listOfPairsToQuery = [];

    for (let i = 0; i < timeInBetweenInDays; i++) {
      const firstDate = lastQueriedTimestamp + i * secondsPerDay;
      const secondDate = Math.min(lastQueriedTimestamp + (i + 1) * secondsPerDay, currentTime);
      listOfPairsToQuery.push([firstDate, secondDate])
    }

    return this.formatListOfDatePairsForCoinMarketCap(listOfPairsToQuery);
  };

  coinMarketCapHistoryUrl = (coinId, date1, date2) => `https://graphs2.coinmarketcap.com/currencies/${coinId}/${date1}/${date2}/`;

  coinMarketCapRequestOptions = (url) => ({
    url,
    credentials: 'omit',
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
      'accept-language': 'en-US,en;q=0.9,tr;q=0.8',
      'cache-control': 'no-cache',
      pragma: 'no-cache'
    },
    json: true,
  });

  sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
  }

  REQUEST_DELAY = 5
  requestToCoinmarketcapWithRetry = co.wrap(function* (url) {
    let attempts = 0;
    const ATTEMPTS_MAX = 10;

    while (attempts < ATTEMPTS_MAX) {
      try {
        return yield request.get(this.coinMarketCapRequestOptions(url));
      } catch (e) {
        attempts++;
        if (e && e.response && e.response.statusCode === 429) {
          const wait = (this.REQUEST_DELAY + e.response.headers['retry-after']);
          yield this.sleep(wait);
        } else {
          console.warn(`Weird error came back for ${url}: ${e.response}`);
          yield this.sleep(5 * attempts);
        }
      }
    }

    yield Promise.reject(new Error(`Request to coinmarketcap.com failed even after trying ${ATTEMPTS_MAX} times for the following URL: ${url}`));
  });

  queryCoinMarketCapForDatePair = async (coinId, date1, date2) => {
    const url = this.coinMarketCapHistoryUrl(coinId, date1, date2);
    let result = [];

    try {
      const resp = await this.requestToCoinmarketcapWithRetry(url);

      if (!resp) {
        throw new Error('Response from coinmarketcap.com is null for some reason.');
      }

      if (!_.has(resp, 'price_usd')) {
        throw new Error('Response from coinmarketcap.com doesnt cointain the key "price_usd"');
      }

      let timestampToCap = {}, timestampToPrice = {}, timestampToVolume = {};
      resp.market_cap_by_available_supply.forEach(dateAndMrktCap => {
        timestampToCap[dateAndMrktCap[0]] = dateAndMrktCap[1];
      });

      resp.volume_usd.forEach(dateAndVolume => {
        timestampToVolume[dateAndVolume[0]] = dateAndVolume[1];
      });

      resp.price_usd.forEach(dateAndPrice => {
        timestampToPrice[dateAndPrice[0]] = dateAndPrice[1];
      });

      Object.keys(timestampToCap).map(timestamp => {
        if (timestampToCap[timestamp] && timestampToPrice[timestamp] && timestampToVolume[timestamp]) {
          result.push({
            coin_id: coinId,
            timestamp: moment(parseInt(timestamp)).toISOString(),
            price: timestampToPrice[timestamp],
            market_cap: timestampToCap[timestamp],
            volume: timestampToVolume[timestamp]
          });
        }
      });
    } catch (e) {
      console.log(e);
    }

    return result;
  };

  requestCoinmarketcapForDateList = async (coinId, datePairs) => {
    let coinHistory = [];
    for (const datePair of datePairs) {
      try {
        const coinHistoryForPair = await this.queryCoinMarketCapForDatePair(coinId, datePair[0], datePair[1]);
        // Faster than concat
        Array.prototype.push.apply(coinHistory, coinHistoryForPair);
        // Coin Market Cap throttles us, may as well respect them.
        this.sleep(1 / this.COINMARKETCAP_REQUESTS_PER_SECOND)
      } catch (e) {
        console.log(e);
      }
    }
    return coinHistory;
  };

  batchWriteCoinHistory = async (coinHistory) => {
    const batchesOfCoinHistory = _.chunk(coinHistory, 10000);
    for (const batchOfCoinHistory of batchesOfCoinHistory) {
      try {
        await CoinHistory.bulkCreate(batchOfCoinHistory, {raw: true} );
      } catch (e) {
        throw new Error(`
      Failed to write a batch of coin history, an example of the data is ${JSON.stringify(_.first(batchOfCoinHistory))}.
      The write error is: ${e}
      `);
      }
    }
  };

  fillDataSinceMostRecent = async (dryRun = false) => {
    const liveCoins = this.fetchLiveCoins(stablecoinJson);

    for (const coinInfo of liveCoins) {
      try {
        const {timestamp} = await this.fetchLatestCoin(coinInfo.coinMarketCapId);

        console.log(`Fetching for ${coinInfo.coinMarketCapId} starting from ${timestamp}.`);
        const remainingDateList = this.fetchListOfRemainingDatesToQuery(timestamp);
        console.log(`Fetching for ${coinInfo.coinMarketCapId} for ${remainingDateList.length} dates.`);

        const coinHistory = await this.requestCoinmarketcapForDateList(coinInfo.coinMarketCapId, remainingDateList);

        if (!dryRun) {
          await this.batchWriteCoinHistory(coinHistory);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  return;
}
