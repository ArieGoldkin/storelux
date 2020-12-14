export const getUserItem = (state) => state.userProfile.item;

export const getUserIsDone = (state) => state.userProfile.isDone;

export const getUserError = (state) => state.userProfile.error;

export const getUserLoading = (state) => state.userProfile.loading;

export const getUserOrdersItems = (state) => state.userProfile.userOrders.items;

export const getUserOrdersLoading = (state) =>
  state.userProfile.userOrders.userOrdersLoading;

export const getUserOrdersError = (state) =>
  state.userProfile.userOrders.ordersError;

export const getUserSoldItems = (state) =>
  state.userProfile.userSoldItems.items;

export const getUserSoldLoading = (state) =>
  state.userProfile.userSoldItems.soldItemsLoading;

export const getUserSoldError = (state) =>
  state.userProfile.userSoldItems.soldItemsError;
