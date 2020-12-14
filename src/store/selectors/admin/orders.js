export const getAllOrders = (state) => state.adminOrders.items;

export const getAllOrdersLoading = (state) => state.adminOrders.loading;

export const getAllOrdersError = (state) => state.adminOrders.error;

export const getIsDone = (state) => state.adminOrders.isDone;

export const chartLoading = (state) => state.adminOrders.chartOrdersLoading;
