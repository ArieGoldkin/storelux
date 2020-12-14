import * as actionTypes from "../actionTypes";

export const getUserSoldItemsRequest = ({ token, userId }) => ({
  type: actionTypes.GET_USER_SOLD_ITEMS_REQUEST,
  payload: {
    token,
    userId,
  },
});

export const getUserSoldItemsSuccess = (items) => ({
  type: actionTypes.GET_USER_SOLD_ITEMS_SUCCESS,
  payload: {
    items,
  },
});

export const getUserSoldItemsFailure = (error) => ({
  type: actionTypes.GET_USER_SOLD_ITEMS_FAILURE,
  payload: {
    error,
  },
});
