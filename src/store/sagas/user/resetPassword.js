import { call, put } from "redux-saga/effects";
import * as api from "../../../api";
import * as actions from "../../actions";
import { toast } from "react-toastify";

export function* resetPassword(action) {
  console.log(action);
  try {
    const responseData = yield call(api.resetUserPassword, {
      email: action.payload.email,
    });
    console.log(responseData);
    yield put(actions.ResetPasswordSuccess(responseData.data.email));
    yield toast.info(
      `Email with recovery password sent to ${responseData.data.email}.`
    );
  } catch (e) {
    yield put(
      actions.ResetPasswordFailure({
        error: "User Email not found, please sign Up.",
      })
    );
  }
}

export function* updatePassword(action) {
  console.log(action);
  try {
    const responseData = yield call(api.updateUserPassword, {
      resetToken: action.payload.resetToken,
      password: action.payload.newPassword,
    });
    console.log(responseData);
    yield put(actions.passwordUpdateSuccess());
    yield toast.info("Password updated successfully, Please go to login page.");
  } catch (e) {
    yield put(
      actions.passwordUpdateFailure({
        error:
          "Could not update password. link has been expired, refresh the page and send new recovery link.",
      })
    );
  }
}