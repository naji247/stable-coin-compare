import express from 'express';
import * as usersApi from './users';
import * as mailApi from './mail';
import { getTokenSupply } from './etherscan';

export const api = express.Router();

api.route('/users/:user_id').get(usersApi.getUserInfo);
api.route('/subscribe').post(mailApi.subscribeToMailingList);
api.route('/token-supply/:ethContractAddress').get(getTokenSupply);
