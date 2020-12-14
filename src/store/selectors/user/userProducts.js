export const getUserProductsLoading = (state) => state.userProducts.loading;

export const getUserProductsError = (state) => state.userProducts.error;

export const getUserProducts = (state) => state.userProducts.items;

export const getUserProductsIsDone = (state) => state.userProducts.isDone;

export const getCurrentUserProducts = (state) =>
  state.userProducts.userProductId;

export const getUserItemLoading = (state) => state.userProducts.itemLoading;

export const getUserProductsChange = (state) => state.userProducts.hasChanged;
