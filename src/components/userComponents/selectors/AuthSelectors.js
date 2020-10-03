export const getAuthToken = (state) => state.auth.token;

export const getAuthUserId = (state) => state.auth.userId;

export const getAuthAdmin = (state) => state.auth.isAdmin;

export const getAuthLoading = (state) => state.auth.loading;

export const getAuthError = (state) => state.auth.error;

export const getCanRedirect = (state) => state.auth.CanRedirect;
