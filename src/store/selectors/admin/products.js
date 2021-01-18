export const getAllProducts = (state) => state.adminProducts.items;

export const getLoading = (state) => state.adminProducts.loading;

export const getError = (state) => state.adminProducts.error;

export const getAdminProductsItemLoading = (state) =>
  state.adminProducts.item.statusLoading;

export const getDeletingLoading = (state) =>
  state.adminProducts.deletingProcess;
