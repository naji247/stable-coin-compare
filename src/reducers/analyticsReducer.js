import * as constants from '../constants';

const initialState = {
  analytics: [],
  loading: false
};
export default function analytics(state = initialState, action) {
  switch (action.type) {
    case constants.GET_LATEST_STARTED:
      return {
        ...state,
        loading: true
      };
    case constants.GET_LATEST_DONE:
      return {
        ...state,
        analytics: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
