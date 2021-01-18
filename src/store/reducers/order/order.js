import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../utility";

const initialState = {
  items: [],
  error: null,
  loading: false,
  isDone: false,
  orderRedirect: "/",
  canRedirect: false,
  canRemove: false,
  isSet: false,

  orderSummary: {
    totalPrice: null,
    currentVat: null,
    vat: null,
    totalSum: null,
    loading: false,
  },
};

const requestSetOrderRequest = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    isDone: false,
    canRedirect: false,
    canRemove: false,
    isSet: false,
    orderSummary: {
      loading: true,
    },
  });
};

const requestSetOrderSuccess = (state, action) => {
  const summary = action.payload.orderSummary;
  console.log(summary);
  return updateObject(state, {
    items: action.payload.items,
    error: null,
    loading: false,
    isDone: true,
    canRemove: false,
    isSet: true,
    orderSummary: {
      totalPrice: summary.totalSum,
      vat: summary.calcVatPrice,
      totalSum: summary.totalSumPrices,
      loading: false,
    },
  });
};

const requestSetOrderFailure = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isDone: true,
    orderSummary: {
      loading: true,
    },
  });
};

const addOrderRequest = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    isDone: false,
    orderSummary: {
      loading: true,
    },
  });
};

const addOrderSuccess = (state, action) => {
  return updateObject(state, {
    loading: true,
    isDone: true,
    canRedirect: false,
    canRemove: true,
    orderSummary: {
      loading: true,
    },
  });
};

const removeItemFromCartRequest = (state, action) => {
  return updateObject(state, {
    isDone: false,
    orderSummary: {
      isDone: false,
    },
  });
};

const orderRedirect = (state, action) => {
  return updateObject(state, {
    items: [],
    loading: false,
    isDone: true,
    canRedirect: true,
    canRemove: true,

    orderSummary: {
      isDone: true,
      loading: false,
    },
  });
};

const setOrderRedirectPath = (state, action) => {
  return updateObject(state, { orderRedirect: action.path });
};

const setDefultValues = (state, action) => {
  return updateObject(state, {
    items: [],
    error: null,
    loading: false,
    isDone: false,
    orderRedirect: "/",
    canRedirect: false,
    canRemove: false,

    orderSummary: {
      totalPrice: null,
      vat: null,
      totalSum: null,
      loading: false,
    },
  });
};

const orderFailure = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isDone: false,
    orderSummary: {
      loading: true,
    },
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ORDER_REQUEST:
      return requestSetOrderRequest(state, action);
    case actionTypes.SET_ORDER_SUCCESS:
      return requestSetOrderSuccess(state, action);
    case actionTypes.SET_ORDER_FAILURE:
      return requestSetOrderFailure(state, action);
    case actionTypes.ADD_ORDER_REQUEST:
      return addOrderRequest(state, action);
    case actionTypes.ADD_ORDER_SUCCESS:
      return addOrderSuccess(state, action);
    case actionTypes.SET_ORDER_REDIRECT_PATH:
      return setOrderRedirectPath(state, action);
    case actionTypes.REMOVE_ITEMS_FROM_CART_REQUEST:
      return removeItemFromCartRequest(state, action);
    case actionTypes.REMOVE_ITEMS_FROM_CART_SUCCESS:
      return orderRedirect(state, action);
    case actionTypes.REMOVE_ITEMS_FROM_CART_FAILURE:
      return orderFailure(state, action);
    case actionTypes.GET_CART_REQUEST:
      return setDefultValues(state, action);
    default:
      return state;
  }
};

export default reducer;
