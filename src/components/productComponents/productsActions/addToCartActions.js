export const Types = {
  ADD_TO_CART_START: "cart/ADD_TO_CART_START",
  ADD_TO_CART_REQUEST: "cart/ADD_TO_CART_REQUEST",
  ADD_TO_CART_SUCCESS: "cart/ADD_TO_CART_SUCCESS",
  ADD_TO_CART_FAILURE: "cart/ADD_TO_CART_FAILURE",
};

export const addToCartRequest = ({
  userId,
  token,
  selectedProduct,
  quantity,
}) => ({
  type: Types.ADD_TO_CART_REQUEST,
  payload: {
    userId,
    token,
    selectedProduct,
    quantity,
  },
});

export const addToCartSuccess = (items) => ({
  type: Types.ADD_TO_CART_SUCCESS,
  payload: items,
});

export const addToCartFailure = ({ error }) => ({
  type: Types.ADD_TO_CART_FAILURE,
  payload: {
    error,
  },
});
