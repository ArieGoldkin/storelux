import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../utility";

const initialState = {
  item: [],
  error: null,
  loading: false,
  isDone: false,
  canRedirect: false,
};

const createNewProductStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    isDone: false,
    canRedirect: false,
  });
};

const createNewProductSuccess = (state, action) => {
  return updateObject(state, {
    item: action.product,
    error: null,
    loading: false,
    isDone: true,
    canRedirect: true,
  });
};

const createNewProductFailure = (state, action) => {
  return updateObject(state, {
    error: action.error.error,
    loading: false,
    isDone: true,
    canRedirect: false,
  });
};

const getProductsAfterRedirect = (state, action) => {
  return updateObject(state, {
    canRedirect: false,
  });
};

const clearProductErrorMessage = (state, action) => {
  return updateObject(state, {
    error: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_PRODUCT_REQUEST:
      return createNewProductStart(state, action);
    case actionTypes.CREATE_PRODUCT_SUCCESS:
      return createNewProductSuccess(state, action);
    case actionTypes.CREATE_PRODUCT_FAILURE:
      return createNewProductFailure(state, action);
    case actionTypes.GET_USER_PRODUCTS_REQUEST:
      return getProductsAfterRedirect(state, action);
    case actionTypes.CLEAR_PRODUCT_FAILURE:
      return clearProductErrorMessage(state, action);
    default:
      return state;
  }
};

export default reducer;
