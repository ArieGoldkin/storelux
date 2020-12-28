import { call, put } from "redux-saga/effects";

import * as api from "../../../api";
import * as actions from "../../actions";

export function* getAdminOrdersByDate(action) {
  try {
    const responseData = yield call(api.getAdminOrdersByDate, {
      token: action.payload.token,
      adminId: action.payload.adminId,
      fromDate: action.payload.fromSelectedDate,
      toDate: action.payload.ToSelectedDate,
    });
    yield put(actions.getOrdersByDateSuccess(responseData.data.orders));
  } catch (e) {
    yield put(
      actions.getOrdersByDateFailure({
        error: e.response.data.message,
      })
    );
  }
}

export function* getOrdersByUserName(action) {
  try {
    const responseData = yield call(api.getOrdersByUserName, {
      token: action.payload.token,
      adminId: action.payload.adminId,
      userName: action.payload.userName,
    });
    yield put(actions.getOrdersByUserNameSuccess(responseData.data.orders));
  } catch (e) {
    yield put(
      actions.getOrdersByUserNameFailure({
        error: "Could not get orders by user name.",
      })
    );
  }
}

export function* getOrders(action) {
  try {
    const responseData = yield call(api.getOrders, {
      adminId: action.payload.adminId,
      token: action.payload.token,
    });
    yield put(actions.getOrdersSuccess(responseData.data.orders));
  } catch (e) {
    yield put(
      actions.getOrdersFailure({
        error: "Could not get Orders form server.",
      })
    );
  }
}
