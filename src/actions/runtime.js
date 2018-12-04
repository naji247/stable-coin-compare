/* eslint-disable import/prefer-default-export */

import * as constants from '../constants';
import request from 'request-promise';
import _ from 'lodash';
import { APP_URL } from '../secrets';

export function setRuntimeVariable({ name, value }) {
  return {
    type: constants.SET_RUNTIME_VARIABLE,
    payload: {
      name,
      value
    }
  };
}

export function getLatestStarted() {
  return {
    type: constants.GET_LATEST_STARTED
  };
}

export function getLatestDone(response) {
  return {
    type: constants.GET_LATEST_DONE,
    payload: response
  };
}

export function getLatest(coinIds) {
  return async dispatch => {
    dispatch(getLatestStarted());
    const apiRequests = _.map(coinIds, coinId =>
      request.get({
        uri: `${APP_URL}/api/coin-history/${coinId}/latest`,
        json: true
      })
    );

    const response = await Promise.all(apiRequests);

    dispatch(getLatestDone(response));
  };
}
