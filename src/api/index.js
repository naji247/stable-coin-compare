import express from 'express';
import * as usersApi from './users';
export const api = express.Router();

api.route('/users/:user_id').get(usersApi.getUserInfo);
