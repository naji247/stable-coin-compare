import request from 'request-promise';
import Feedback from '../data/models/Feedback';
import moment from 'moment';
import stableCoinInfo from '../stablecoinInfo.json';
import { COINMARKETCAP_API_KEY } from '../secrets';
import sequelize from '../data/sequelize';
import _ from 'lodash';

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
    console.log(coinId);
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
