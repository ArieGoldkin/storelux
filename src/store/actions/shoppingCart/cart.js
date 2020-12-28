import * as actionTypes from "../actionTypes";

export const getCartRequest = (userId, token, vatRate) => ({
  type: actionTypes.GET_CART_REQUEST,
  userId,
  token,
  vatRate,
});

export const getCartSuccess = (items, cartSum) => ({
  type: actionTypes.GET_CART_SUCCESS,
  items: items,
  cartSum: cartSum,
});

export const getCartFailure = (error) => ({
  type: actionTypes.GET_CART_FAILURE,
  error: error,
});

export const addProductQuantity = (productId) => ({
  type: actionTypes.ADD_PRODUCT_QUANTITY,
  productId: productId,
});

export const removeProductQuantity = (productId) => ({
  type: actionTypes.REMOVE_PRODUCT_QUANTITY,
  productId: productId,
});

export const setProductQuantityRequest = (
  userId,
  token,
  productId,
  quantity,
  vatRate
) => ({
  type: actionTypes.SET_PRODUCT_QUANTITY_REQUEST,
  payload: {
    productId: productId,
    quantity: quantity,
    userId: userId,
    token: token,
    vatRate,
  },
});

export const setProductQuantitySuccess = (cartSummary) => ({
  type: actionTypes.SET_PRODUCT_QUANTITY_SUCCESS,
  payload: {
    cartSummary,
  },
});

export const setProductQuantityFailure = (error) => ({
  type: actionTypes.SET_PRODUCT_QUANTITY_FAILURE,
  error: error,
});

export const deleteProductFromCartRequest = (
  token,
  userId,
  productId,
  vatRate
) => ({
  type: actionTypes.DELETE_FROM_CART_REQUEST,
  token,
  userId,
  productId,
  vatRate,
});

export const deleteProductFromCartSuccess = (items, newCartSummary) => ({
  type: actionTypes.DELETE_FROM_CART_SUCCESS,
  payload: {
    newCartSummary,
    items,
  },
});

export const deleteProductFromCartFailure = (error) => ({
  type: actionTypes.DELETE_FROM_CART_FAILURE,
  error: error,
});

export const addToCartRequest = ({
  userId,
  token,
  selectedProduct,
  quantity,
  vatRate,
}) => ({
  type: actionTypes.ADD_TO_CART_REQUEST,
  payload: {
    userId,
    token,
    selectedProduct,
    quantity,
    vatRate,
  },
});

export const addToCartSuccess = (items, cartSum) => ({
  type: actionTypes.ADD_TO_CART_SUCCESS,
  payload: {
    items,
    cartSum,
  },
});

export const addToCartFailure = (error) => ({
  type: actionTypes.ADD_TO_CART_FAILURE,
  payload: {
    error,
  },
});

export const clearCartErrorMessage = () => {
  return {
    type: actionTypes.CLEAR_CART_ERROR_MESSAGE,
  };
};
