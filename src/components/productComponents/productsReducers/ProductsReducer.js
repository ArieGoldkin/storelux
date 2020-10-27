import { Types } from "../productsActions/productsActions";
import { updateObject } from "../../store/utility";

import { Types as adminActions } from "../../adminComponents/adminActions/adminActions";
import { Types as searchActions } from "../productsActions/SearchProductsActions";
import { Types as OrderActions } from "../../orderComponents/orderActions/OrderActions";

const initialState = {
  items: [], //products
  error: null,
  loading: true,
  isDone: false,
  itemLoading: false,
  categoryLoading: false,
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
  console.log(action);
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
    case Types.ON_CHANGE_INPUT_SEARCH:
      return onSearchInputRequest(state, action);
    case searchActions.FIND_PRODUCTS_BY_TITLE_SUCCESS:
      return searchProductsByTitleSuccess(state, action);
    case searchActions.FIND_PRODUCTS_BY_TITLE_FAILURE:
      return searchProductsByTitleFailure(state, action);
    case adminActions.CHANGE_PRODUCT_STATUS_SUCCESS:
      return productsStatusChanged(state, action);
    case searchActions.ON_CHANGE_CATEGORY_SEARCH:
      return onSearchCategoryRequest(state, action);
    case searchActions.FIND_PRODUCT_BY_CATEGORY_SUCCESS:
      return onSearchCategorySuccess(state, action);
    case searchActions.FIND_PRODUCT_BY_CATEGORY_FAILURE:
      return onSearchCategoryFailure(state, action);
    default:
      return state;
  }
}
