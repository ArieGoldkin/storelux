import { Types } from "../usersActions/authActions";
import { Types as ResetPasswordActions } from "../usersActions/ResetUserPasswordActions";
import { updateObject } from "../../store/utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  canRedirect: false,
  isLogin: false,
  isAdmin: null,
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    isLogin: false,
    isAdmin: null,
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

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    isLogin: false,
    isAdmin: false,
  });
};
const ResetPasswordStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};
const ResetPasswordSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
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

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case Types.USER_AUTH_START:
      return authStart(state, action);
    case Types.USER_LOGIN_START:
      return authStart(state, action);
    case Types.USER_AUTH_SUCCESS:
      return authUserSuccess(state, action);
    case Types.USER_LOGIN_SUCCESS:
      return authUserSuccess(state, action);
    case Types.USER_AUTH_FAILURE:
      return AuthUserFailure(state, action);
    case Types.USER_LOGIN_FAILURE:
      return AuthUserFailure(state, action);
    case Types.USER_AUTH_LOGOUT:
      return authLogout(state, action);
    case ResetPasswordActions.RESET_PASSWORD_REQUEST:
    case ResetPasswordActions.NEW_PASSWORD_UPDATE_REQUEST:
      return ResetPasswordStart(state, action);
    case ResetPasswordActions.RESET_PASSWORD_SUCCESS:
      return ResetPasswordSuccess(state, action);
    case ResetPasswordActions.NEW_PASSWORD_UPDATE_SUCCESS:
      return updatePasswordSuccess(state, action);
    case ResetPasswordActions.RESET_PASSWORD_FAILURE:
    case ResetPasswordActions.NEW_PASSWORD_UPDATE_FAILURE:
      return ResetPasswordFailure(state, action);
    default:
      return state;
  }
}
