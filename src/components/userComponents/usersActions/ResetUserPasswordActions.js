export const Types = {
  RESET_PASSWORD_REQUEST: "password/RESET_PASSWORD_REQUEST",
  RESET_PASSWORD_SUCCESS: "password/RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_FAILURE: "password/RESET_PASSWORD_FAILURE",

  NEW_PASSWORD_UPDATE_REQUEST: "password/NEW_PASSWORD_UPDATE_REQUEST",
  NEW_PASSWORD_UPDATE_SUCCESS: "password/NEW_PASSWORD_UPDATE_SUCCESS",
  NEW_PASSWORD_UPDATE_FAILURE: "password/NEW_PASSWORD_UPDATE_FAILURE",
};

export const ResetPasswordRequest = (email) => ({
  type: Types.RESET_PASSWORD_REQUEST,
  payload: {
    email: email,
  },
});

export const ResetPasswordSuccess = () => ({
  type: Types.RESET_PASSWORD_SUCCESS,
});

export const ResetPasswordFailure = (error) => ({
  type: Types.RESET_PASSWORD_FAILURE,
  payload: {
    error: error,
  },
});

export const passwordUpdateRequest = ({ resetToken, newPassword }) => ({
  type: Types.NEW_PASSWORD_UPDATE_REQUEST,
  payload: {
    resetToken,
    newPassword,
  },
});

//maybe update user and login after reseting password
export const passwordUpdateSuccess = () => ({
  type: Types.NEW_PASSWORD_UPDATE_SUCCESS,
});

export const passwordUpdateFailure = (error) => ({
  type: Types.RESET_PASSWORD_FAILURE,
  payload: {
    error,
  },
});
