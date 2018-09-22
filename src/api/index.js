import express from 'express';
import * as usersApi from './users';
import * as mailApi from './mail';
export const api = express.Router();

api.route('/users/:user_id').get(usersApi.getUserInfo);
api.route('/subscribe').post(mailApi.subscribeToMailingList);
