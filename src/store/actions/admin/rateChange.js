import * as actionTypes from "../actionTypes";

export const updateRateRequest = ({ newRate, adminId, token }) => ({
  type: actionTypes.UPDATE_VAT_RATE_REQUEST,
  payload: {
    newRate: newRate,
    adminId: adminId,
    token: token,
  },
});

export const updateRateSuccess = (vatRate) => ({
  type: actionTypes.UPDATE_VAT_RATE_SUCCESS,
  payload: {
    vatRate: vatRate,
  },
});

export const updateRateFailure = (error) => ({
  type: actionTypes.UPDATE_VAT_RATE_FAILURE,
  payload: {
    error: error,
  },
});
