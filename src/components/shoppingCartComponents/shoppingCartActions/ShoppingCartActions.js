export const Types = {
  GET_CART_REQUSET: "cart/GET_CART_REQUSET",
  GET_CART_SUCCESS: "cart/GET_CART_SUCCESS",
  GET_CART_FAILURE: "cart/GET_CART_FAILURE",

  ADD_PRODUCT_QUANTITY: "cart/ADD_PRODUCT_QUANTITY",
  REMOVE_PRODUCT_QUANTITY: "cart/REMOVE_PRODUCT_QUANTITY",

  SET_PRODUCT_QUANTITY_REQUEST: "cart/SET_PRODUCT_QUANTITY_REQUEST",
  SET_PRODUCT_QUANTITY_SUCCESS: "cart/SET_PRODUCT_QUANTITY_SUCCESS",
  SET_PRODUCT_QUANTITY_FAILURE: "cart/SET_PRODUCT_QUANTITY_FAILURE",

  DELETE_FROM_CART_REQUEST: "cart/DELETE_FROM_CART_REQUEST",
  DELETE_FROM_CART_SUCCESS: "cart/DELETE_FROM_CART_SUCCESS",
  DELETE_FROM_CART_FAILURE: "cart/DELETE_FROM_CART_FAILURE",

  SET_TOTAL_SUMMARY_REQUEST: "cart/SET_TOTAL_SUMMARY_REQUEST",
  SET_TOTAL_SUMMARY_SUCCESS: "cart/SET_TOTAL_SUMMARY_SUCCESS",
  SET_TOTAL_SUMMARY_FAILURE: "cart/SET_TOTAL_SUMMARY_FAILURE",
};

export const getCartRequest = (userId, token) => ({
  type: Types.GET_CART_REQUSET,
  userId,
  token,
});

export const getCartSuccess = (items) => ({
  type: Types.GET_CART_SUCCESS,
  items: items,
});

export const getCartFailure = (error) => ({
  type: Types.GET_CART_FAILURE,
  error: error,
});

export const addProductQuantity = (productId) => ({
  type: Types.ADD_PRODUCT_QUANTITY,
  productId: productId,
});

export const removeProductQuantity = (productId) => ({
  type: Types.REMOVE_PRODUCT_QUANTITY,
  productId: productId,
});

export const setProductQuantityRequest = (
  userId,
  token,
  productId,
  quantity
) => ({
  type: Types.SET_PRODUCT_QUANTITY_REQUEST,
  payload: {
    productId: productId,
    quantity: quantity,
    userId: userId,
    token: token,
  },
});

export const setProductQuantitySuccess = () => ({
  type: Types.SET_PRODUCT_QUANTITY_SUCCESS,
});

export const setProductQuantityFailure = (error) => ({
  type: Types.SET_PRODUCT_QUANTITY_FAILURE,
  error: error,
});

export const deleteProductFromCartRequest = (token, userId, productId) => ({
  type: Types.DELETE_FROM_CART_REQUEST,
  token,
  userId,
  productId,
});

export const deleteProductFromCartSuccess = (productId) => ({
  type: Types.DELETE_FROM_CART_SUCCESS,
  productId: productId,
});

export const deleteProductFromCartFailure = (error) => ({
  type: Types.DELETE_FROM_CART_FAILURE,
  error: error,
});
