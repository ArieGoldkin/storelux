import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../utility";

const initialState = {
  items: [], //products
  error: null,
  loading: true,
  isDone: false,
  itemLoading: true,
  categoryLoading: false,
};

const requestProductsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    isDone: false,
    itemLoading: true,
    categoryLoading: false,
  });
};

const requestProductsSuccess = (state, action) => {
  return updateObject(state, {
    items: action.products.items,
    error: null,
    loading: false,
    isDone: true,
  });
};

const getProductsFailure = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isDone: true,
  });
};

const onDeleteProductSuccess = (state, action) => {
  return updateObject(state, {
    items: state.items.filter((item) => {
      return !action.productId.includes(item.id);
    }),
  });
};

const onCreateProductSuccess = (state, action) => {
  return updateObject(state, {
    items: state.items.concat(action.product),
  });
};

const updateOrdersQuantityState = (state, action) => {
  return updateObject(state, {
    loading: true,
    isDone: false,
  });
};

const onSearchInputRequest = (state, action) => {
  return updateObject(state, {
    itemLoading: true,
  });
};

const searchProductsByTitleSuccess = (state, action) => {
  return updateObject(state, {
    items: action.payload.items,
    itemLoading: false,
  });
};

const searchProductsByTitleFailure = (state, action) => {
  return updateObject(state, {
    error: action.payload.error,
    itemLoading: false,
  });
};

const productsStatusChanged = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const onSearchCategoryRequest = (state, action) => {
  return updateObject(state, {
    categoryLoading: true,
    error: null,
  });
};

const onSearchCategorySuccess = (state, action) => {
  return updateObject(state, {
    items: action.payload.items,
    categoryLoading: false,
    error: null,
  });
};

const onSearchCategoryFailure = (state, action) => {
  return updateObject(state, {
    error: action.payload.error,
    categoryLoading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_REQUEST:
      return requestProductsStart(state, action);
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return requestProductsSuccess(state, action);
    case actionTypes.GET_PRODUCTS_FAILURE:
      return getProductsFailure(state, action);
    case actionTypes.CREATE_PRODUCT_SUCCESS:
      return onCreateProductSuccess(state, action);
    case actionTypes.DELETE_PRODUCT_SUCCESS:
      return onDeleteProductSuccess(state, action);
    case actionTypes.ADD_ORDER_SUCCESS:
      return updateOrdersQuantityState(state, action);
    case actionTypes.ON_CHANGE_INPUT_SEARCH:
      return onSearchInputRequest(state, action);
    case actionTypes.FIND_PRODUCTS_BY_TITLE_SUCCESS:
      return searchProductsByTitleSuccess(state, action);
    case actionTypes.FIND_PRODUCTS_BY_TITLE_FAILURE:
      return searchProductsByTitleFailure(state, action);
    case actionTypes.CHANGE_PRODUCT_STATUS_SUCCESS:
      return productsStatusChanged(state, action);
    case actionTypes.ON_CHANGE_CATEGORY_SEARCH:
      return onSearchCategoryRequest(state, action);
    case actionTypes.FIND_PRODUCT_BY_CATEGORY_SUCCESS:
      return onSearchCategorySuccess(state, action);
    case actionTypes.FIND_PRODUCT_BY_CATEGORY_FAILURE:
      return onSearchCategoryFailure(state, action);
    default:
      return state;
  }
};

export default reducer;
