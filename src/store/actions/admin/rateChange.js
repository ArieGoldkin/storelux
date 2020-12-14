import * as actionTypes from "../actionTypes";

export const updateRateRequest = ({ rate, adminId, token }) => ({
  type: actionTypes.UPDATE_VAT_RATE_REQUEST,
  payload: {
    rate: rate,
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
