import * as actionTypes from "../actionTypes";

export const getOrdersByDateRequest = ({
  token,
  adminId,
  fromSelectedDate,
  ToSelectedDate,
}) => ({
  type: actionTypes.GET_ORDERS_BY_DATE_REQUEST,
  payload: {
    token,
    adminId,
    fromSelectedDate,
    ToSelectedDate,
  },
});

export const getOrdersByDateSuccess = (orders) => ({
  type: actionTypes.GET_ORDERS_BY_DATE_SUCCESS,
  payload: {
    orders,
  },
});

export const getOrdersByDateFailure = (error) => ({
  type: actionTypes.GET_ORDERS_BY_DATE_FAILURE,
  payload: {
    error,
  },
});

export const getOrdersByUserNameRequest = ({ adminId, token, userName }) => ({
  type: actionTypes.GET_ORDERS_BY_USER_NAME_REQUEST,
  payload: {
    adminId,
    token,
    userName,
  },
});

export const getOrdersByUserNameSuccess = (items) => ({
  type: actionTypes.GET_ORDERS_BY_USER_NAME_SUCCESS,
  payload: {
    items,
  },
});

export const getOrdersByUserNameFailure = (error) => ({
  type: actionTypes.GET_ORDERS_BY_USER_NAME_FAILURE,
  payload: {
    error,
  },
});

export const getOrdersRequest = ({ adminId, token }) => ({
  type: actionTypes.GET_ALL_ORDERS_REQUEST,
  payload: {
    adminId,
    token,
  },
});

export const getOrdersSuccess = (orders) => ({
  type: actionTypes.GET_ALL_ORDERS_SUCCESS,
  payload: {
    orders,
  },
});

export const getOrdersFailure = (error) => ({
  type: actionTypes.GET_ALL_ORDERS_FAILURE,
  payload: {
    error,
  },
});

export const clearOrdersByDataError = () => {
  return {
    type: actionTypes.CLEAR_ORDERS_BY_DATE_ERROR,
  };
};
