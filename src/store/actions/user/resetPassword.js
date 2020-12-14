import * as actionTypes from "../actionTypes";

export const ResetPasswordRequest = (email) => ({
  type: actionTypes.RESET_PASSWORD_REQUEST,
  payload: {
    email: email,
  },
});

export const ResetPasswordSuccess = () => ({
  type: actionTypes.RESET_PASSWORD_SUCCESS,
});

export const ResetPasswordFailure = (error) => ({
  type: actionTypes.RESET_PASSWORD_FAILURE,
  payload: {
    error: error,
  },
});

export const passwordUpdateRequest = ({ resetToken, newPassword }) => ({
  type: actionTypes.NEW_PASSWORD_UPDATE_REQUEST,
  payload: {
    resetToken,
    newPassword,
  },
});

//maybe update user and login after reseting password
export const passwordUpdateSuccess = () => ({
  type: actionTypes.NEW_PASSWORD_UPDATE_SUCCESS,
});

export const passwordUpdateFailure = (error) => ({
  type: actionTypes.RESET_PASSWORD_FAILURE,
  payload: {
    error,
  },
});
