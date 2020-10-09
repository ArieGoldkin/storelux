import { Types } from "../productsActions/productsActions";
import { updateObject } from "../../store/utility";

// import { Types as adminActions } from "../../adminComponents/adminActions/adminActions";
import { Types as searchActions } from "../productsActions/SearchProductsActions";
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
  console.log(state);
  console.log(action);
  debugger;
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

const searchProductsByTitleRequest = (state, action) => {
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

// const requestProductStart = (state, action) => {
//   return updateObject(state, {
//     isDone: false,
//     itemLoading: true,
//   });
// };
// const adminDeleteSuccess = (state, action) => {
//   return updateObject(state, {
//     items: state.items.filter((item) => {
//       return !action.items.includes(item.id);
//     }),
//     error: null,
//     loading: false,
//     isDone: true,
//     itemLoading: false,
//   });
// };

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
    case searchActions.FIND_PRODUCTS_BY_TITLE_REQUEST:
      return searchProductsByTitleRequest(state, action);
    case searchActions.FIND_PRODUCTS_BY_TITLE_SUCCESS:
      return searchProductsByTitleSuccess(state, action);
    case searchActions.FIND_PRODUCTS_BY_TITLE_FAILURE:
      return searchProductsByTitleFailure(state, action);
    // case adminActions.DELETE_PRODUCTS_REQUEST:
    //   return requestProductStart(state, action);
    // case adminActions.DELETE_PRODUCTS_SUCCESS:
    //   return adminDeleteSuccess(state, action);
    // case adminActions.DELETE_PRODUCTS_FAILURE:
    //   return getProductsFailure(state, action);
    default:
      return state;
  }
}
