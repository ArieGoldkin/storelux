import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  canRedirect: false,
  isLogin: false,
  isAdmin: null,
  logOutMessage: null,
  authRedirectPath: "/",
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    canRedirect: false,
    isLogin: false,
    isAdmin: null,
    logOutMessage: null,
  });
};

const authUserSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    expiresIn: action.tokenExpirationTime,
    error: null,
    loading: false,
    isLogin: true,
    isAdmin: action.admin,
  });
};

const AuthUserFailure = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isLogin: false,
  });
};

const clearErrorMessage = (state, action) => {
  return updateObject(state, {
    error: null,
  });
};
const setAuthRedirectPath = (state, action) => {
  return updateObject(state, {
    authRedirectPath: action.path,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    error: null,
    loading: false,
    canRedirect: false,
    isLogin: false,
    isAdmin: null,
    logOutMessage: null,
    authRedirectPath: "/",
  });
};
const ResetPasswordStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    canRedirect: false,
  });
};
const ResetPasswordSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    canRedirect: true,
  });
};
const ResetPasswordFailure = (state, action) => {
  return updateObject(state, {
    error: action.payload.error,
    loading: false,
  });
};

const updatePasswordSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    canRedirect: true,
  });
};

const onLogOutMessage = (state, action) => {
  return updateObject(state, {
    logOutMessage: action.payload.message,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_AUTH_START:
      return authStart(state, action);
    case actionTypes.USER_LOGIN_START:
      return authStart(state, action);
    case actionTypes.USER_AUTH_SUCCESS:
      return authUserSuccess(state, action);
    case actionTypes.USER_LOGIN_SUCCESS:
      return authUserSuccess(state, action);
    case actionTypes.USER_AUTH_FAILURE:
      return AuthUserFailure(state, action);
    case actionTypes.USER_CLEAR_ERROR_MESSAGE:
      return clearErrorMessage(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    case actionTypes.USER_LOGIN_FAILURE:
      return AuthUserFailure(state, action);
    case actionTypes.USER_AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.USER_LOG_OUT_MESSAGE:
      return onLogOutMessage(state, action);
    case actionTypes.RESET_PASSWORD_REQUEST:
    case actionTypes.NEW_PASSWORD_UPDATE_REQUEST:
      return ResetPasswordStart(state, action);
    case actionTypes.RESET_PASSWORD_SUCCESS:
      return ResetPasswordSuccess(state, action);
    case actionTypes.NEW_PASSWORD_UPDATE_SUCCESS:
      return updatePasswordSuccess(state, action);
    case actionTypes.RESET_PASSWORD_FAILURE:
    case actionTypes.NEW_PASSWORD_UPDATE_FAILURE:
      return ResetPasswordFailure(state, action);
    default:
      return state;
  }
};

export default reducer;
