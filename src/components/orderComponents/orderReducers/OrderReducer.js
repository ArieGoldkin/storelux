import { Types } from "../orderActions/OrderActions";
import { Types as cartTypes } from "../../shoppingCartComponents/shoppingCartActions/ShoppingCartActions";
import { updateObject } from "../../store/utility";

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
      totalPrice: summary.sum,
      vat: summary.calcVat,
      totalSum: summary.total,
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

export default function orders(state = initialState, action) {
  switch (action.type) {
    case Types.SET_ORDER_REQUEST:
      return requestSetOrderRequest(state, action);
    case Types.SET_ORDER_SUCCESS:
      return requestSetOrderSuccess(state, action);
    case Types.SET_ORDER_FAILURE:
      return requestSetOrderFailure(state, action);
    case Types.ADD_ORDER_REQUEST:
      return addOrderRequest(state, action);
    case Types.ADD_ORDER_SUCCESS:
      return addOrderSuccess(state, action);
    case Types.SET_ORDER_REDIRECT_PATH:
      return setOrderRedirectPath(state, action);
    case Types.REMOVE_ITEMS_FROM_CART_REQUESET:
      return removeItemFromCartRequest(state, action);
    case Types.REMOVE_ITEMS_FROM_CART_SUCCESS:
      return orderRedirect(state, action);
    case Types.REMOVE_ITEMS_FROM_CART_FAILURE:
      return orderFailure(state, action);
    case cartTypes.GET_CART_REQUSET:
      return setDefultValues(state, action);
    default:
      return state;
  }
}
