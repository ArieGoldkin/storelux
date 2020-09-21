import { Types } from "../productsActions/productsActions";
import { updateObject } from "../../store/utility";

import { Types as OrderActions } from "../../orderComponents/orderActions/OrderActions";

const initialState = {
  items: [], //products
  error: null,
  loading: true,
  isDone: false,
  failure: false,
};

const requestProductsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    isDone: false,
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
    failure: true,
  });
};

const onCreateOrDeleteProductSuccess = (state, action) => {
  return updateObject(state, {
    isDone: false,
  });
};


const updateOrdersQuantityState = (state, action) => {
  return updateObject(state, {
    loading: true,
    isDone: false,
  });
};

export default function products(state = initialState, action) {
  switch (action.type) {
    case Types.GET_PRODUCTS_REQUEST:
      return requestProductsStart(state, action);
    case Types.GET_PRODUCTS_SUCCESS:
      return requestProductsSuccess(state, action);
    case Types.GET_PRODUCTS_FAILURE:
      return getProductsFailure(state, action);
    case Types.CREATE_PRODUCT_SUCCESS:
      return onCreateOrDeleteProductSuccess(state, action);
    case Types.DELETE_PRODUCT_SUCCESS:
      return onCreateOrDeleteProductSuccess(state, action);
    case OrderActions.ADD_ORDER_SUCCESS:
      return updateOrdersQuantityState(state, action);
    default:
      return state;
  }
}
