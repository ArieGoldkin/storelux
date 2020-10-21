import { takeLatest, call, fork, put } from "redux-saga/effects";
import * as api from "../../api/usersApi";
import * as actions from "../usersActions/UserActions";

function* getUsers() {
  try {
    const resultUsers = yield call(api.getUsers);
    yield put(
      actions.getUsersSuccess({
        items: resultUsers.data.users,
      })
    );
  } catch (e) {
    yield put(
      actions.userError({
        error: "An error happened when trying to get Users",
      })
    );
  }
}

function* watchGetUsersRequest() {
  yield takeLatest(actions.Types.GET_USERS_REQUEST, getUsers); //takeEvery it works like while(true)
}

function* getUserData(action) {
  try {
    const userData = yield call(api.getUserData, {
      userId: action.userId,
    });
    yield put(actions.getUserDataSuccess(userData.data.user));
  } catch (e) {
    yield put(
      actions.userDataFailure({
        error: "An error happened when trying to get user data",
      })
    );
  }
}

function* watchGetUserDataRequest() {
  yield takeLatest(actions.Types.USER_PROFILE_REQUEST, getUserData);
}

function* updateUser(action) {
  try {
    const userUpdate = yield call(api.updateUserData, {
      userId: action.userId,
      formData: action.formData,
    });
    yield put(actions.userUpdateSuccess(userUpdate.data.user));
    console.log(userUpdate.data.user);
  } catch (e) {
    yield put(
      actions.userUpdateFailure({
        error: "an error happened when trying to update user data.",
      })
    );
  }
}

function* watchUpdateUserRequest() {
  yield takeLatest(actions.Types.USER_UPDATE_REQUEST, updateUser);
}

function* getUserOrders(action) {
  try {
    const responseData = yield call(api.getUserOrders, {
      token: action.payload.token,
      userId: action.payload.userId,
    });
    console.log(responseData);
    yield put(actions.getUserOrderSuccess(responseData.data.orders));
  } catch (e) {
    const errorMessage = e.response.data.message;
    yield put(
      actions.getUserOrderFailure({
        error: errorMessage,
      })
    );
  }
}

function* watchUserOrdersRequest() {
  yield takeLatest(actions.Types.GET_USER_ORDERS_REQUEST, getUserOrders);
}

function* getOrdersByDate(action) {
  try {
    const responseData = yield call(api.getOrdersByDate, {
      token: action.payload.token,
      userId: action.payload.userId,
      fromDate: action.payload.fromSelectedDate,
      toDate: action.payload.ToSelectedDate,
    });
    console.log(responseData);
    yield put(actions.getUserOrdersByDateSuccess(responseData.data.orders));
  } catch (e) {
    console.log(e.response);
    yield put(
      actions.getUserOrderFailure({
        error: e.response.data.message,
      })
    );
  }
}

function* watchGetOrdersByDateRequest() {
  yield takeLatest(actions.Types.USER_ORDERS_BY_DATE_REQUEST, getOrdersByDate);
}

const userSagas = [
  fork(watchGetUsersRequest),
  fork(watchGetUserDataRequest),
  fork(watchUpdateUserRequest),
  fork(watchUserOrdersRequest),
  fork(watchGetOrdersByDateRequest),
];

export default userSagas;
