export const getCartSummaryLoading = (state) => state.cart.cartSummary.loading;

export const getCartSummary = (state) => state.cart.cartSummary;

export const getCartItems = (state) => state.cart.items;

export const getCartIsDone = (state) => state.cart.isDone;

export const getCartLoading = (state) => state.cart.loading;

export const getCartError = (state) => state.cart.error;

export const getCartProductLoading = (state) =>
  state.cart.product.productLoading;

export const getCartProductError = (state) => state.cart.product.productError;
