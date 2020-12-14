export const getAllProducts = (state) => state.adminProducts.items;

export const getLoading = (state) => state.adminProducts.loading;

export const getError = (state) => state.adminProducts.error;

export const getAdminItemLoading = (state) => state.adminProducts.item.statusLoading;
