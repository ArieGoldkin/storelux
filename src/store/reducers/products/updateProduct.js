import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../utility";

const initialState = {
  item: [],
  error: null,
  loading: true,
  isDone: false,
  canRedirect: false,
};

const productRequest = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    isDone: false,
    canRedirect: false,
  });
};

const productSuccess = (state, action) => {
  return updateObject(state, {
    item: action.product,
    error: null,
    loading: false,
    isDone: true,
  });
};

const productFailure = (state, action) => {
  return updateObject(state, {
    error: action.error.error,
    loading: false,
    isDone: true,
  });
};

const updateRequest = (state, action) => {
  return updateObject(state, {
    loading: true,
    isDone: false,
  });
};

const updateProductFailure = (state, action) => {
  console.log(state);
  console.log(action.error);
  return updateObject(state, {
    error: action.error.error,
    canRedirect: false,
    loading: false,
  });
};

const updateLoadingAfterSuccess = (state, action) => {
  return updateObject(state, {
    loading: true,
    canRedirect: true,
  });
};

const clearUpdateErrorMessage = (state, action) => {
  return updateObject(state, {
    error: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_REQUEST:
      return productRequest(state, action);
    case actionTypes.GET_PRODUCT_SUCCESS:
      return productSuccess(state, action);
    case actionTypes.GET_PRODUCT_FAILURE:
      return productFailure(state, action);
    case actionTypes.UPDATE_PRODUCT_REQUEST:
      return updateRequest(state, action);
    case actionTypes.UPDATE_PRODUCT_SUCCESS:
      return updateLoadingAfterSuccess(state, action);
    case actionTypes.UPDATE_PRODUCT_FAILURE:
      return updateProductFailure(state, action);
    case actionTypes.CLEAR_UPDATE_PRODUCT_FAILURE:
      return clearUpdateErrorMessage(state, action);
    default:
      return state;
  }
};

export default reducer;
