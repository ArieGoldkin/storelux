import * as actionTypes from "../actionTypes";

export const changeStatusStart = ({ adminId, token, productId }) => ({
  type: actionTypes.CHANGE_PRODUCT_STATUS_START,
  payload: {
    adminId,
    token,
    productId,
  },
});

export const changeStatusSuccess = (item) => ({
  type: actionTypes.CHANGE_PRODUCT_STATUS_SUCCESS,
  payload: {
    item,
  },
});

export const changeStatusFailure = (error) => ({
  type: actionTypes.CHANGE_PRODUCT_STATUS_FAILURE,
  payload: {
    error,
  },
});
