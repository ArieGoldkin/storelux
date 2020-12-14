import * as actionTypes from "../actionTypes";

export const setOrderRequest = (items, vatRate) => ({
  type: actionTypes.SET_ORDER_REQUEST,
  payload: {
    items: items,
    vatRate: vatRate,
  },
});

export const setOrderSuccess = (items, orderSummary) => ({
  type: actionTypes.SET_ORDER_SUCCESS,
  payload: {
    items: items,
    orderSummary: orderSummary,
  },
});

export const setOrderFailure = (error) => ({
  type: actionTypes.SET_ORDER_FAILURE,
  error,
});

export const addOrderRequest = (
  userId,
  token,
  products,
  firstName,
  email,
  address,
  phone,
  orderSummary
) => ({
  type: actionTypes.ADD_ORDER_REQUEST,
  userId,
  token,
  products,
  firstName,
  email,
  address,
  phone,
  orderSummary,
});

export const addOrderSuccess = (order) => ({
  type: actionTypes.ADD_ORDER_SUCCESS,
  order,
});

export const addOrderFailure = (error) => ({
  type: actionTypes.SET_ORDER_FAILURE,
  error,
});

export const DeleteFromCartAfterOrderRequest = (token, userId, product) => ({
  type: actionTypes.REMOVE_ITEMS_FROM_CART_REQUEST,
  token,
  userId,
  product: product,
});

export const DeleteProductsFromCart = (token, userId, products) => ({
  type: actionTypes.REMOVE_PRODUCTS_FROM_CART_REQUEST,
  token,
  userId,
  products: products,
});

export const DeleteFromCartAfterOrderSuccess = () => ({
  type: actionTypes.REMOVE_ITEMS_FROM_CART_SUCCESS,
});

export const DeleteFromCartAfterOrderFailure = (error) => ({
  type: actionTypes.REMOVE_ITEMS_FROM_CART_FAILURE,
  error,
});

export const setOrderRedirectPath = (userId, path) => ({
  type: actionTypes.SET_ORDER_REDIRECT_PATH,
  userId: userId,
  path: path,
});
