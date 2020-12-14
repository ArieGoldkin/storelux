import { call, put, delay } from "redux-saga/effects";
import * as api from "../../../api";

import * as actions from "../../actions";

export function* signUpUser(action) {
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
        error: e.response.data.message,
      })
    );
  }
}

export function* loginUser(action) {
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
        error: e.response.data.message,
      })
    );
  }
}

export function* logoutUser(action) {
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "userId");
  yield call([localStorage, "removeItem"], "expiresIn");
  yield call([localStorage, "removeItem"], "isAdmin");
  yield put(actions.logoutSucceed());
  // yield put(
  //   actions.onLogOutMessage({
  //     message: "You where logged out, please login again.",
  //   })
  // );
}

export function* checkAuthTimeSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
  yield put(
    actions.onLogOutMessage({
      message: "You where logged out, please login again.",
    })
  );
}

export function* authCheckStateSaga(action) {
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
