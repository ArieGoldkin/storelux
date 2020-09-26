import { Types } from "../productsActions/productsActions";
import { updateObject } from "../../store/utility";

import { Types as adminActions } from "../../adminComponents/adminActions/adminActions";
import { Types as OrderActions } from "../../orderComponents/orderActions/OrderActions";

const initialState = {
  items: [], //products
  error: null,
  loading: true,
  isDone: false,
  failure: false,
  itemLoading: false,
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

const onDeleteProductSuccess = (state, action) => {
  return updateObject(state, {
    isDone: false,
  });
};

const onCreateProductSuccess = (state, action) => {
  console.log(action);
  return updateObject(state, {
    items: state.items.concat(action.product),
    isDone: true,
  });
};

const updateOrdersQuantityState = (state, action) => {
  return updateObject(state, {
    loading: true,
    isDone: false,
  });
};

const requestproductStart = (state, action) => {
  return updateObject(state, {
    isDone: false,
    itemLoading: true,
  });
};
const adminDeleteSuccess = (state, action) => {
  return updateObject(state, {
    items: state.items.filter((item) => {
      return !action.items.includes(item.id);
    }),
    error: null,
    loading: false,
    isDone: true,
    itemLoading: false,
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
      return onCreateProductSuccess(state, action);
    case Types.DELETE_PRODUCT_SUCCESS:
      return onDeleteProductSuccess(state, action);
    case OrderActions.ADD_ORDER_SUCCESS:
      return updateOrdersQuantityState(state, action);
    case adminActions.DELETE_PRODUCTS_REQUESET:
      return requestproductStart(state, action);
    case adminActions.DELETE_PRODUCTS_SUCCESS:
      return adminDeleteSuccess(state, action);
    case adminActions.DELETE_PRODUCTS_FAILURE:
      return getProductsFailure(state, action);
    default:
      return state;
  }
}
