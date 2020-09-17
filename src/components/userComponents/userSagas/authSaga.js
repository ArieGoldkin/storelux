import { takeLatest, call, fork, put, delay } from "redux-saga/effects";
import * as api from "../../api/usersApi";
import * as actions from "../usersActions/authActions";

function* signUpUser(action) {
  try {
    const user = yield call(api.createUser, {
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
      email: action.payload.email,
      password: action.payload.password,
    });
    // const getCurrentTime = yield new Date(new Date().getTime() + 3000);
    const getCurrentTime = 3600;
    const tokenExpirationTime = yield new Date(
      new Date().getTime() + 1000 * 60 * 60
    );

    yield localStorage.setItem("token", user.data.token);
    yield localStorage.setItem("userId", user.data.userId);
    yield localStorage.setItem("expiresIn", tokenExpirationTime);
    yield put(actions.AuthSuccess(user.data.token, user.data.userId));
    yield put(actions.checkAuthTimeout(getCurrentTime));
    console.log(tokenExpirationTime);
    console.log(getCurrentTime);
    console.log(user);
  } catch (e) {
    yield put(
      actions.AuthFailure({
        error: "an error happend when trying add new user",
      })
    );
  }
}

function* watchSignupUserRequest() {
  yield takeLatest(actions.Types.USER_AUTH_START, signUpUser);
}

function* loginUser(action) {
  try {
    const user = yield call(api.loginUser, {
      email: action.payload.email,
      password: action.payload.password,
    });
    // const getCurrentTime = yield new Date(new Date().getTime() + 3000);
    const getCurrentTime = 3600;
    const tokenExpirationTime = yield new Date(
      new Date().getTime() + 1000 * 60 * 60
    );
    yield localStorage.setItem("token", user.data.token);
    yield localStorage.setItem("userId", user.data.userId);
    yield localStorage.setItem("expiresIn", tokenExpirationTime);
    yield localStorage.setItem("isAdmin", user.data.admin);
    yield put(
      actions.LoginSuccess(user.data.token, user.data.userId, user.data.admin)
    );
    yield put(actions.checkAuthTimeout(getCurrentTime));
  } catch (e) {
    yield put(
      actions.LoginFailure({
        error: "an error happend when trying login",
      })
    );
  }
}

function* watchLoginUserReques() {
  yield takeLatest(actions.Types.USER_LOGIN_START, loginUser);
}
function* logoutUser(action) {
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "userId");
  yield call([localStorage, "removeItem"], "expiresIn");
  yield call([localStorage, "removeItem"], "isAdmin");
  yield put(actions.logoutSucceed());
}

function* watchLogoutUserReques() {
  yield takeLatest(actions.Types.USER_AUTH_INITIATE_LOGOUT, logoutUser);
}

function* checkAuthTimeSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

function* watchcheckAuthTimeSaga() {
  yield takeLatest(actions.Types.USER_AUTH_CHECK_TIMEOUT, checkAuthTimeSaga);
}

function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(localStorage.getItem("expiresIn"));
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem("userId");
      const isAdmin = yield localStorage.getItem("isAdmin");
      yield put(actions.AuthSuccess(token, userId, isAdmin));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}

function* watchauthCheckStateSaga() {
  yield takeLatest(actions.Types.USER_AUTH_CHECK_STATE, authCheckStateSaga);
}

const authSagas = [
  fork(watchSignupUserRequest),
  fork(watchLoginUserReques),
  fork(watchLogoutUserReques),
  fork(watchcheckAuthTimeSaga),
  fork(watchauthCheckStateSaga),
];

export default authSagas;
