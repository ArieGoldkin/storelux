export const Types = {
  GET_USERS_REQUEST: "users/GET_USERS.REQUEST",
  GET_USERS_SUCCESS: "users/GET_USERS.SUCCESS",
  GET_USERS_FAILURE: "users/GET_USERS.FAILURE",

  USER_PROFILE_REQUEST: "user/USER_PROFILE.REQUEST",
  USER_PROFILE_START: "user/USER_PROFILE.START",
  USER_PROFILE_SUCCESS: "user/USER_PROFILE.SUCCESS",
  USER_PROFILE_FAILURE: "user/USER_PROFILE.FAILURE",

  USER_UPDATE_START: "user/USER_UPDATE.START",
  USER_UPDATE_REQUEST: "user/USER_UPDATE.REQUEST",
  USER_UPDATE_SUCCESS: "user/USER_UPDATE.SUCCESS",
  USER_UPDATE_FAILURE: "user/USER_UPDATE.FAILURE",

  GET_USER_ORDERS_REQUEST: "user/GET_USER_ORDERS_REQUEST",
  GET_USER_ORDERS_SUCCESS: "user/GET_USER_ORDERS_SUCCESS",
  GET_USER_ORDERS_FAILURE: "user/GET_USER_ORDERS_FAILURE",

  USER_ORDERS_BY_DATE_REQUEST: "user/USER_ORDERS_BY_DATE_REQUEST",
  USER_ORDERS_BY_DATE_SUCCESS: "user/USER_ORDERS_BY_DATE_SUCCESS",
  USER_ORDERS_BY_DATE_FAILURE: "user/USER_ORDERS_BY_DATE_FAILURE",

  CHANGE_USER_PRODUCTS: "user/CHANGE_USER_PRODUCTS",
};

export const changeUserProducts = () => ({
  type: Types.CHANGE_USER_PRODUCTS,
});

export const getUsersRequest = () => ({
  type: Types.GET_USERS_REQUEST,
});

export const getUsersSuccess = (items) => ({
  type: Types.GET_USERS_SUCCESS,
  users: items,
});

export const userError = (error) => ({
  type: Types.GET_USERS_FAILURE,
  error: error,
});

export const userDataStart = (userId) => ({
  type: Types.USER_PROFILE_REQUEST,
  userId: userId,
});

export const getUserDataSuccess = (item) => ({
  type: Types.USER_PROFILE_SUCCESS,
  user: item,
});

export const userDataFailure = (error) => ({
  type: Types.USER_PROFILE_FAILURE,
  error: error,
});

export const userUpdateRequest = (userId, formData) => ({
  type: Types.USER_UPDATE_REQUEST,
  userId,
  formData,
});

export const userUpdateSuccess = (item) => ({
  type: Types.USER_UPDATE_SUCCESS,
  user: item,
});

export const userUpdateFailure = (error) => {
  return {
    type: Types.USER_UPDATE_FAILURE,
    error: error,
  };
};

export const getUserOrdersRequest = ({ userId, token }) => ({
  type: Types.GET_USER_ORDERS_REQUEST,
  payload: {
    userId,
    token,
  },
});

export const getUserOrderSuccess = (items) => ({
  type: Types.GET_USER_ORDERS_SUCCESS,
  payload: {
    items,
  },
});

export const getUserOrderFailure = (error) => ({
  type: Types.GET_USER_ORDERS_FAILURE,
  payload: {
    error,
  },
});

export const getUserOrdersByDateRequest = ({
  token,
  userId,
  fromSelectedDate,
  ToSelectedDate,
}) => ({
  type: Types.USER_ORDERS_BY_DATE_REQUEST,
  payload: {
    token,
    userId,
    fromSelectedDate,
    ToSelectedDate,
  },
});

export const getUserOrdersByDateSuccess = (items) => ({
  type: Types.USER_ORDERS_BY_DATE_SUCCESS,
  payload: {
    items,
  },
});

export const getUserOrdersByDateFailure = (error) => ({
  type: Types.USER_ORDERS_BY_DATE_SUCCESS,
  payload: {
    error,
  },
});
