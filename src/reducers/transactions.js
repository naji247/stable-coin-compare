import * as constants from '../constants';

const initialState = {
  isLoading: false,
  transactions: null,
};

export default function transactionState(state = initialState, action) {
  switch (action.type) {
    case constants.GET_TRANSACTIONS_START:
      return { ...state, isLoading: true };

    case constants.GET_TRANSACTIONS_DONE:
      return { ...state, isLoading: false, transactions: action.payload };

    case constants.GET_TRANSACTIONS_ERROR:
      return { ...state, isLoading: false };

    default:
      return state;
  }
}
