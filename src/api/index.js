import express from 'express';
import * as usersApi from './users';
import * as mailApi from './mail';
import { getTokenSupply } from './etherscan';
import { postFeedback } from './feedback';
import * as coinHistoryApi from './coinHistory';

export const api = express.Router();

api.route('/users/:user_id').get(usersApi.getUserInfo);
api.route('/subscribe').post(mailApi.subscribeToMailingList);
api.route('/token-supply/:ethContractAddress').get(getTokenSupply);
api.route('/feedback').post(postFeedback);
api.route('/coin-history/:coinId/latest').get(coinHistoryApi.getLatestDataForCoin);
api.route('/coin-history/cron/run').get(coinHistoryApi.runCoinHistoryCron);
api.route('/coin-history/cron/start').get(coinHistoryApi.startCoinHistoryCron);
api.route('/coin-history/cron/status').get(coinHistoryApi.statusCoinHistoryCron);
api.route('/coin-history/cron/stop').get(coinHistoryApi.stopCoinHistoryCron);
