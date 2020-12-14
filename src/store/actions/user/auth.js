import * as actionTypes from "../actionTypes";

export const Authenticate = (firstName, lastName, email, password) => ({
  type: actionTypes.USER_AUTH_START,
  payload: {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  },
});

export const AuthSuccess = (token, userId, admin) => {
  return {
    type: actionTypes.USER_AUTH_SUCCESS,
    token: token,
    userId: userId,
    admin: admin,
  };
};

export const AuthFailure = (error) => ({
  type: actionTypes.USER_AUTH_FAILURE,
  error: error,
});

export const LoginAuth = (email, password) => ({
  type: actionTypes.USER_LOGIN_START,
  payload: {
    email: email,
    password: password,
  },
});

export const LoginSuccess = (token, userId, admin) => {
  return {
    type: actionTypes.USER_LOGIN_SUCCESS,
    token: token,
    userId: userId,
    admin: admin,
  };
};

export const LoginFailure = (error) => ({
  type: actionTypes.USER_LOGIN_FAILURE,
  error: error,
});

export const logout = () => {
  return {
    type: actionTypes.USER_AUTH_INITIATE_LOGOUT,
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.USER_AUTH_LOGOUT,
  };
};

export const onLogOutMessage = (message) => ({
  type: actionTypes.USER_LOG_OUT_MESSAGE,
  payload: {
    message,
  },
});

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.USER_AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime,
  };
};

export const authCheckState = () => {
  return {
    type: actionTypes.USER_AUTH_CHECK_STATE,
  };
};

export const clearErrorMessage = () => {
  return {
    type: actionTypes.USER_CLEAR_ERROR_MESSAGE,
  };
};

export const setAuthRedirectPath = (path)=>{
  return{
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  }
}
