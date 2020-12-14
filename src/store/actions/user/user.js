import * as actionTypes from "../actionTypes";

export const changeUserProducts = () => ({
  type: actionTypes.CHANGE_USER_PRODUCTS,
});

export const getUsersRequest = () => ({
  type: actionTypes.GET_USERS_REQUEST,
});

export const getUsersSuccess = (items) => ({
  type: actionTypes.GET_USERS_SUCCESS,
  users: items,
});

export const userError = (error) => ({
  type: actionTypes.GET_USERS_FAILURE,
  error: error,
});

export const userDataStart = (userId) => ({
  type: actionTypes.USER_PROFILE_REQUEST,
  userId: userId,
});

export const getUserDataSuccess = (item) => ({
  type: actionTypes.USER_PROFILE_SUCCESS,
  user: item,
});

export const userDataFailure = (error) => ({
  type: actionTypes.USER_PROFILE_FAILURE,
  error: error,
});

export const userUpdateRequest = (userId, formData) => ({
  type: actionTypes.USER_UPDATE_REQUEST,
  userId,
  formData,
});

export const userUpdateSuccess = (item) => ({
  type: actionTypes.USER_UPDATE_SUCCESS,
  user: item,
});

export const userUpdateFailure = (error) => {
  return {
    type: actionTypes.USER_UPDATE_FAILURE,
    error: error,
  };
};

export const getUserOrdersRequest = ({ userId, token }) => ({
  type: actionTypes.GET_USER_ORDERS_REQUEST,
  payload: {
    userId,
    token,
  },
});

export const getUserOrderSuccess = (items) => ({
  type: actionTypes.GET_USER_ORDERS_SUCCESS,
  payload: {
    items,
  },
});

export const getUserOrderFailure = (error) => ({
  type: actionTypes.GET_USER_ORDERS_FAILURE,
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
  type: actionTypes.USER_ORDERS_BY_DATE_REQUEST,
  payload: {
    token,
    userId,
    fromSelectedDate,
    ToSelectedDate,
  },
});

export const getUserOrdersByDateSuccess = (items) => ({
  type: actionTypes.USER_ORDERS_BY_DATE_SUCCESS,
  payload: {
    items,
  },
});

export const getUserOrdersByDateFailure = (error) => ({
  type: actionTypes.USER_ORDERS_BY_DATE_SUCCESS,
  payload: {
    error,
  },
});
