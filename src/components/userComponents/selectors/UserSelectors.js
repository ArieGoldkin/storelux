export const getUsers = (state) => state.users.items;

export const getUsersLoading = (state) => state.users.loading;

export const getUsersError = (state) => state.users.error;

export const getUsersIsDone = (state) => state.users.isDone;

export const getUserProductsChange = (state) => state.userProducts.hasChanged;

export const getUserItem = (state) => state.user.item;

export const getUserIsDone = (state) => state.user.isDone;

export const getUserError = (state) => state.user.error;

export const getUserLoading = (state) => state.user.loading;
