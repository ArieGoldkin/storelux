export const getAllProducts = (state) => state.adminAllProducts.items;

export const getLoading = (state) => state.adminAllProducts.loading;

export const getError = (state) => state.adminAllProducts.error;

export const getItemLoading = (state) =>
  state.adminAllProducts.item.statusLoading;
