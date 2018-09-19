import * as constants from '../constants';
import jwt from 'jsonwebtoken';

const initialState = {
  isHydrating: true,
  isLoadingLogin: false,
  loginError: null,
  serverLoginAttempts: 0,
  serverSignupAttempts: 0,

  isLoadingSignup: false,
  signupError: null,
  token: null,
};

export const isAuthenticated = state => {
  if (!state.token) return false;
  const { exp } = jwt.decode(state.token);
  return new Date(exp * 1000) > Date.now();
};

export default function userState(state = initialState, action) {
  switch (action.type) {
    case constants.HYDRATE_AUTH:
      return { ...state, isHydrating: false, token: action.payload };
    case constants.LOGIN_START:
      return { ...state, isLoadingLogin: true, token: null };
    case constants.LOGIN_DONE:
      return {
        ...state,
        token: action.payload.token,
        isLoadingLogin: false,
        loginError: null,
      };
    case constants.LOGIN_ERROR:
      return {
        ...state,
        token: null,
        isLoadingLogin: false,
        loginError: action.payload,
        serverLoginAttempts: state.serverLoginAttempts + 1,
      };
    case constants.SIGNUP_START:
      return {
        ...state,
        isLoadingSignup: true,
        token: null,
      };
    case constants.SIGNUP_DONE:
      return {
        ...state,
        token: action.payload.token,
        isLoadingSignup: false,
        signupError: null,
      };
    case constants.SIGNUP_ERROR:
      return {
        ...state,
        token: null,
        isLoadingSignup: false,
        signupError: action.payload,
        serverSignupAttempts: state.serverSignupAttempts + 1,
      };

    case constants.LOGOUT:
      return { ...initialState, isHydrating: false };

    default:
      return state;
  }
}
