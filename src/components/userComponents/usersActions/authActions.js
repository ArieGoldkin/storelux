export const Types = {
  USER_AUTH_START: "user/USER_AUTH.START",
  USER_AUTH_SUCCESS: "user/USER_AUTH.SUCCESS",
  USER_AUTH_FAILURE: "user/USER_AUTH.FAILURE",

  USER_AUTH_INITIATE_LOGOUT: "user/USER_AUTH_INITIATE.LOGOUT",
  USER_AUTH_LOGOUT: "user/USER_AUTH.LOGOUT",
  USER_AUTH_CHECK_TIMEOUT: "user/USER_AUTH_CHECK.TIMEOUT",
  USER_AUTH_CHECK_STATE: "user/USER_AUTH_CHECK.STATE",

  USER_LOGIN_START: "user/USER_LOGIN.START",
  USER_LOGIN_SUCCESS: "user/USER_LOGIN.SUCCESS",
  USER_LOGIN_FAILURE: "user/USER_LOGIN.FAILURE",
};

// export const authStart = () => {
//   return {
//     type: Types.USER_AUTH_START,
//   };
// };

export const Auth = (firstName, lastName, email, password) => ({
  type: Types.USER_AUTH_START,
  payload: {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  },
});

export const AuthSuccess = (token, userId, admin) => {
  return {
    type: Types.USER_AUTH_SUCCESS,
    token: token,
    userId: userId,
    admin: admin,
  };
};

export const AuthFailure = (error) => ({
  type: Types.USER_AUTH_FAILURE,
  error: error,
});

export const LoginAuth = (email, password) => ({
  type: Types.USER_LOGIN_START,
  payload: {
    email: email,
    password: password,
  },
});

export const LoginSuccess = (token, userId, admin) => {
  return {
    type: Types.USER_LOGIN_SUCCESS,
    token: token,
    userId: userId,
    admin: admin,
  };
};

export const LoginFailure = (error) => ({
  type: Types.USER_LOGIN_FAILURE,
  error: error,
});

export const logout = () => {
  return {
    type: Types.USER_AUTH_INITIATE_LOGOUT,
  };
};

export const logoutSucceed = () => {
  return {
    type: Types.USER_AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: Types.USER_AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime,
  };
};

export const authCheckState = () => {
  return {
    type: Types.USER_AUTH_CHECK_STATE,
  };
};
