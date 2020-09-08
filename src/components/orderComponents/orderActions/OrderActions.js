export const Types = {
  SET_ORDER_REQUEST: "order/SET_ORDER_REQUEST",
  SET_ORDER_SUCCESS: "order/SET_ORDER_SUCCESS",
  SET_ORDER_FAILURE: "order/SET_ORDER_FAILURE",

  ADD_ORDER_REQUEST: "order/ADD_ORDER_REQUEST",
  ADD_ORDER_SUCCESS: "order/ADD_ORDER_SUCCESS",
  ADD_ORDER_FAILURE: "order/ADD_ORDER_FAILURE",

  REMOVE_ITEMS_FROM_CART_REQUESET: "order/REMOVE_ITEMS_FROM_CART_REQUESET",
  REMOVE_ITEMS_FROM_CART_SUCCESS: "order/REMOVE_ITEMS_FROM_CART_SUCCESS",
  REMOVE_ITEMS_FROM_CART_FAILURE: "order/REMOVE_ITEMS_FROM_CART_FAILURE",

  SET_ORDER_REDIRECT_PATH: "order/SET_ORDER_REDIRECT_PATH",
};

export const setOrderRequest = (items) => ({
  type: Types.SET_ORDER_REQUEST,
  items: items,
});

export const setOrderSuccess = (items) => ({
  type: Types.SET_ORDER_SUCCESS,
  items: items,
});

export const setOrderFaiulre = (error) => ({
  type: Types.SET_ORDER_FAILURE,
  error,
});

export const addOrderRequest = (
  userId,
  token,
  product,
  firstName,
  email,
  address,
  phone,
  orderSummary
) => ({
  type: Types.ADD_ORDER_REQUEST,
  userId,
  token,
  product,
  firstName,
  email,
  address,
  phone,
  orderSummary,
});

export const addOrderSuccess = () => ({
  type: Types.ADD_ORDER_SUCCESS,
});

export const addOrderFailure = (error) => ({
  type: Types.SET_ORDER_FAILURE,
  error,
});

export const DeleteFromCartAfterOrderRequest = (token, userId, productId) => ({
  type: Types.REMOVE_ITEMS_FROM_CART_REQUESET,
  token,
  userId,
  productId,
});

export const DeleteFromCartAfterOrderSuccess = () => ({
  type: Types.REMOVE_ITEMS_FROM_CART_SUCCESS,
});

export const DeleteFromCartAfterOrderFaiulre = (error) => ({
  type: Types.REMOVE_ITEMS_FROM_CART_FAILURE,
  error,
});

export const setOrderRedirectPath = (userId, path) => ({
  type: Types.SET_ORDER_REDIRECT_PATH,
  userId: userId,
  path: path,
});