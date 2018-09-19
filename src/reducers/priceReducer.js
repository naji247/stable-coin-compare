import * as constants from '../constants';

const initialState = {
  prices: [],
  loading: false,
};
export default function price(state = initialState, action) {
  switch (action.type) {
    case constants.GET_ALL_PRICES_STARTED:
      return {
        ...state,
        loading: true,
      };
    case constants.GET_ALL_PRICES_DONE:
      return {
        ...state,
        prices: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
