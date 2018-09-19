import * as constants from '../constants';
import request from 'request-promise';
import { APP_URL } from '../secrets';
import store from '../storeUtil';
import history from '../history';
import jwt from 'jsonwebtoken';

export function getTransactionsStart() {
  return {
    type: constants.GET_TRANSACTIONS_START,
  };
}

export function getTransactionsDone(response) {
  return {
    type: constants.GET_TRANSACTIONS_DONE,
    payload: response,
  };
}

export function getTransactionsError(error) {
  return {
    type: constants.GET_TRANSACTIONS_ERROR,
    payload: error,
  };
}

export function getTransactionsForUser(userToken) {
  return async dispatch => {
    dispatch(getTransactionsStart());
    const { id } = jwt.decode(userToken);
    try {
      const response = await request.get({
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        uri: `${APP_URL}/api/users/${id}/transactions`,
        json: true,
      });
      // TODO: Add long term storage
      dispatch(getTransactionsDone(response));
    } catch (error) {
      dispatch(getTransactionsError(error));
    }
  };
}
