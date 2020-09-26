import { Types } from "../adminActions/adminActions";
import { updateObject } from "../../store/utility";

const initialState = {
  vat: null,
  error: null,
  loading: false,
};

const globalDataSuccess = (state, action) => {
  console.log(action);
  return updateObject(state, {
    vat: action.payload.data.vatRate,
    error: null,
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

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_GLOBAL_DATA_SUCCESS:
      return globalDataSuccess(state, action);
    case Types.GET_GLOBAL_DATA_FAILURE:
      return globalDataFailure(state, action);
    case Types.UPDATE_VAT_RATE_REQUEST:
      return updateRateRequest(state, action);
    case Types.UPDATE_VAT_RATE_SUCCESS:
      return updateRareSuccess(state, action);
    case Types.UPDATE_VAT_RATE_FAILURE:
      return updateRateFailure(state, action);
    default:
      return state;
  }
}
