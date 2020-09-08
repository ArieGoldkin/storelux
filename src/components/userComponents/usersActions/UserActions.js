export const Types = {
  GET_USERS_REQUEST: "users/GET_USERS.REQUEST",
  GET_USERS_SUCCESS: "users/GET_USERS.SUCCESS",
  GET_USERS_FAILURE: "users/GET_USERS.FAILURE",

  USER_PROFILE_REQUEST: "user/USER_PROFILE.REQUEST",
  USER_PROFILE_START: "user/USER_PROFILE.START",
  USER_PROFILE_SUCCESS: "user/USER_PROFILE.SUCCESS",
  USER_PROFILE_FAILURE: "user/USER_PROFILE.FAILURE",

  USER_UPDATE_START: "user/USER_UPDATE.START",
  USER_UPDATE_REQUEST: "user/USER_UPDATE.REQUEST",
  USER_UPDATE_SUCCESS: "user/USER_UPDATE.SUCCESS",
  USER_UPDATE_FAILURE: "user/USER_UPDATE.FAILURE",
};

export const getUsersRequest = () => ({
  type: Types.GET_USERS_REQUEST,
});

export const getUsersSuccess = (items) => ({
  type: Types.GET_USERS_SUCCESS,
  users: items,
});

export const userError = (error) => ({
  type: Types.GET_USERS_FAILURE,
  error: error,
});


export const userDataStart = (userId) => ({
  type: Types.USER_PROFILE_REQUEST,
  userId: userId,
});

export const getUserDataSuccess = (item) => ({
  type: Types.USER_PROFILE_SUCCESS,
  user: item,
});

export const userDataFailure = (error) => ({
  type: Types.USER_PROFILE_FAILURE,
  error: error,
});

export const userUpdateRequest = (userId, formData) => ({
  type: Types.USER_UPDATE_REQUEST,
  userId,
  formData,
});

export const userUpdateSuccess = (item) => ({
  type: Types.USER_UPDATE_SUCCESS,
  user: item,
});

export const userUpdateFailure = (error) => {
  return {
    type: Types.USER_UPDATE_FAILURE,
    error: error,
  };
};
