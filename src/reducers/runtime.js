import * as constants from '../constants';

export default function runtime(state = {}, action) {
  switch (action.type) {
    case constants.SET_RUNTIME_VARIABLE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
}
