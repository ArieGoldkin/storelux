import * as actionTypes from "../actionTypes";

export const getGlobalDataRequest = (token) => ({
  type: actionTypes.GET_GLOBAL_DATA_REQUEST,
  payload: {
    token: token,
  },
});

export const getGlobalDataSuccess = (data) => ({
  type: actionTypes.GET_GLOBAL_DATA_SUCCESS,
  payload: {
    data: data,
  },
});

export const getGlobalDataFailure = (error) => ({
  type: actionTypes.GET_GLOBAL_DATA_FAILURE,
  payload: {
    error: error,
  },
});