import { combineReducers } from 'redux';
import runtime from './runtime';
import analytics from './analyticsReducer';
import userState from './user';
import transactionState from './transactions';

export default combineReducers({
  runtime,
  analytics,
  userState,
  transactionState
});
