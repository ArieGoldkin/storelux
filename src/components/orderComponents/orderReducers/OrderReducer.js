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

  orderSummary: {
    totalPrice: null,
    vat: null,
    totalSum: null,
    loading: false,
  },
};

const calcSummary = (action) => {
  //   let sum = 0;
  let calcVat;
  let total;
  let currentVat = 0.17;
  let totalPrice = action.items.price * action.items.quantity;
  //   totalPrice.map((item) => (sum += item));
  calcVat = (totalPrice * currentVat).toFixed(2);
  total = (totalPrice * currentVat + totalPrice).toFixed(2);
  return { totalPrice, calcVat, total };
};

const requestSetOrderRequest = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    isDone: false,
    canRedirect: false,
    canRemove: false,
    orderSummary: {
      loading: true,
    },
  });
};

const requestSetOrderSuccess = (state, action) => {
  const { totalPrice, calcVat, total } = calcSummary(action);
  return updateObject(state, {
    items: action.items,
    error: null,
    loading: false,
    isDone: true,
    // canRemove: false,
    orderSummary: {
      totalPrice: totalPrice,
      vat: calcVat,
      totalSum: total,
      loading: false,
    },
  });
};

const requestSetOrderFailure = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: true,
    isDone: true,
  });
};

const addOrderRequest = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    isDone: false,
    // canRemove: false,
    orderSummary: {
      loading: true,
    },
  });
};

const addOrderSuccess = (state, action) => {
  return updateObject(state, {
    loading: true,
    isDone: false,
    canRedirect: true,
    canRemove: true,
    orderSummary: {
      loading: false,
    },
  });
};

const orderRedirect = (state, action) => {
  return updateObject(state, {
    loading: false,
    isDone: true,
    canRedirect: true,
    canRemove: true,
  });
};

const setOrderRedirectPatch = (state, action) => {
  return updateObject(state, { orderRedirect: action.path });
};

const setDefultValues = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    isDone: false,
    orderRedirect: "/",
    canRedirect: false,
    canRemove: false,
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
      return setOrderRedirectPatch(state, action);
    case Types.REMOVE_ITEMS_FROM_CART_SUCCESS:
      return orderRedirect(state, action);
    case cartTypes.GET_CART_REQUSET:
      return setDefultValues(state, action);
    default:
      return state;
  }
}
