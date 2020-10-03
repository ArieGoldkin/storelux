import { takeLatest, call, fork, put } from "redux-saga/effects";
import * as api from "../../api/usersApi";
import * as actions from "../usersActions/ResetUserPasswordActions";
import { toast } from "react-toastify";

function* resetPassword(action) {
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

function* watchResetPasswordRequest() {
  yield takeLatest(actions.Types.RESET_PASSWORD_REQUEST, resetPassword);
}

function* updatePassword(action) {
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

function* watchUpdatePasswordRequest() {
  yield takeLatest(actions.Types.NEW_PASSWORD_UPDATE_REQUEST, updatePassword);
}

const ResetPasswordSagas = [
  fork(watchResetPasswordRequest),
  fork(watchUpdatePasswordRequest),
];

export default ResetPasswordSagas;
