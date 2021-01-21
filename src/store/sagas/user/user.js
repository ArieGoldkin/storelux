import { call, put } from "redux-saga/effects";
import * as api from "../../../api";
import * as actions from "../../actions";

export function* getUsers() {
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

export function* getUserData(action) {
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

export function* updateUser(action) {
  try {
    const userUpdate = yield call(api.updateUserData, {
      userId: action.userId,
      formData: action.formData,
    });
    yield put(actions.userUpdateSuccess(userUpdate.data.user));
  } catch (e) {
    yield put(
      actions.userUpdateFailure({
        error: "an error happened when trying to update user data.",
      })
    );
  }
}

export function* getUserOrders(action) {
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

export function* getOrdersByDate(action) {
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

export function* getSoldItems(action) {
  try {
    const responseData = yield call(api.getUserSoldItems, {
      token: action.payload.token,
      userId: action.payload.userId,
    });
    yield put(actions.getUserSoldItemsSuccess(responseData.data.items));
  } catch (e) {
    console.log(e.response.data);
    yield put(
      actions.getUserSoldItemsFailure({
        error: e.response.data.message,
      })
    );
  }
}
