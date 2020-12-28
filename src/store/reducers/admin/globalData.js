import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../utility";

const initialState = {
  vat: null,
  error: null,
  loading: false,
};

const getGlobalDataRequest = (state, action) => {
  return updateObject(state, {
    vat: null,
    error: null,
    loading: true,
  });
};

const globalDataSuccess = (state, action) => {
  return updateObject(state, {
    vat: action.payload.data.vatRate,
    error: null,
    loading: false,
  });
};

const globalDataFailure = (state, action) => {
  return updateObject(state, {
    error: action.payload.error,
  });
};

const updateRateRequest = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};
const updateRareSuccess = (state, action) => {
  return updateObject(state, {
    vat: action.payload.vatRate,
    loading: false,
  });
};

const updateRateFailure = (state, action) => {
  return updateObject(state, {
    error: action.payload.error,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_GLOBAL_DATA_REQUEST:
      return getGlobalDataRequest(state, action);
    case actionTypes.GET_GLOBAL_DATA_SUCCESS:
      return globalDataSuccess(state, action);
    case actionTypes.GET_GLOBAL_DATA_FAILURE:
      return globalDataFailure(state, action);
    case actionTypes.UPDATE_VAT_RATE_REQUEST:
      return updateRateRequest(state, action);
    case actionTypes.UPDATE_VAT_RATE_SUCCESS:
      return updateRareSuccess(state, action);
    case actionTypes.UPDATE_VAT_RATE_FAILURE:
      return updateRateFailure(state, action);
    default:
      return state;
  }
};

export default reducer;
