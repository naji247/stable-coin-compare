import request from 'request-promise';
import Feedback from '../data/models/Feedback';
import moment from 'moment';
import stableCoinInfo from '../stablecoinInfo.json'
import {COINMARKETCAP_API_KEY} from "../secrets";
import sequelize from '../data/sequelize';
import _ from 'lodash';

const cmcSlugsToIds = {
  "tether": 825,
  "trueusd": 2563,
  "usd-coin": 3408,
  "paxos-standard-token": 3330,
  "dai": 2308,
  "gemini-dollar": 3306,
  "steem-dollars": 1312,
  "bridgecoin": 2033,
  "bitusd": 623,
  "white-standard": 3003
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
    const SQL_STRING = `SELECT * FROM coin_history WHERE coin_id = '${coinId}' ORDER BY timestamp DESC LIMIT 1;`;
    const row = await sequelize.query(SQL_STRING, { type: sequelize.QueryTypes.SELECT }).then(rows => _.first(rows));
    if (!row) {throw new Error(`No row found for coin id ${coinId} while fetching latest coin history.`)}
    res.send(row);
  } catch (error) {
    res.status(500).send({ message: `Error occurred. ${error.message}` });
  }
};
