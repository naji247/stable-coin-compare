import { CronJob } from 'cron';
import sequelize from '../data/sequelize';
import _ from 'lodash';
import CoinMarketCapDataFiller from "./dataFiller";
const dataFiller = new CoinMarketCapDataFiller();

const cmcSlugsToIds = {
  tether: 825,
  trueusd: 2563,
  'usd-coin': 3408,
  'paxos-standard-token': 3330,
  dai: 2308,
  'gemini-dollar': 3306,
  'steem-dollars': 1312,
  bridgecoin: 2033,
  bitusd: 623,
  'white-standard': 3003
};

export const getLatestDataForCoin = async (req, res) => {
  const { coinId } = req.params;

  if (!coinId) {
    res.status(400).send({
      message: ['Required field: "coinId".']
    });
    return;
  }

  try {
    const LATEST_SQL_STRING = `SELECT * FROM coin_history WHERE coin_id = '${coinId}' ORDER BY timestamp DESC LIMIT 1;`;
    const latest_row = await sequelize
      .query(LATEST_SQL_STRING, { type: sequelize.QueryTypes.SELECT })
      .then(rows => _.first(rows));

    if (!latest_row) {
      throw new Error(
        `No row found for coin id ${coinId} while fetching latest coin history.`
      );
    }
    const AVG_DEV_WINDOW = `2 weeks`;
    const AVG_DEV_SQL_STRING = `SELECT 10000 * AVG(ABS(price-1)) as avg_deviation FROM coin_history WHERE coin_id = '${coinId}' AND timestamp > now() - interval '${AVG_DEV_WINDOW}'`;
    const avg_dev = await sequelize
      .query(AVG_DEV_SQL_STRING, { type: sequelize.QueryTypes.SELECT })
      .then(rows => _.first(rows));

    if (!avg_dev) {
      throw new Error(
        `No row found for coin id ${coinId} while fetching average deviation.`
      );
    }
    latest_row.avg_deviation = avg_dev.avg_deviation;

    res.send(latest_row);
  } catch (error) {
    res.status(500).send({ message: `Error occurred. ${error.message}` });
  }
};


const getCoinHistory = async () => {
  await dataFiller.fillDataSinceMostRecent();
};

const coinHistoryCron = new CronJob(
  '*/30 * * * *',
  getCoinHistory,
  null,
  false,
  'America/Los_Angeles',
);

export const runCoinHistoryCron = async (req, res, next) => {
  try {
    await getCoinHistory();
    res.send('Seeded coin history.');
  } catch (error) {
    console.error(error);
    res.send('Failed seeding coin history.');
  }
};

export const startCoinHistoryCron = (req, res, next) => {
  try {
    coinHistoryCron.start();
    coinHistoryCron.running = true;
    res.send('Coin History cron started.');
  } catch (error) {
    res.send(error);
  }
};

export const statusCoinHistoryCron = (req, res, next) => {
  if (coinHistoryCron.running) {
    res.send('Coin History cron is RUNNING');
  } else {
    res.send('Coin History cron is STOPPED');
  }
};

export const stopCoinHistoryCron = (req, res, next) => {
  try {
    coinHistoryCron.stop();
    coinHistoryCron.running = false;
    res.send('Coin History cron stopped');
  } catch (error) {
    res.send(error);
  }
};
