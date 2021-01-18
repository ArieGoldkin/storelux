import { call, put } from "redux-saga/effects";

import * as api from "../../../api";
import * as actions from "../../actions";

export function* changeProductStatus(action) {
  try {
    const responseData = yield call(api.productStatusChange, {
      adminId: action.payload.adminId,
      token: action.payload.token,
      productId: action.payload.productId,
    });
    yield put(actions.changeStatusSuccess(responseData.data.product));
  } catch (e) {
    yield put(
      actions.changeStatusFailure({
        error: "Could not change status, please try again.",
      })
    );
  }
}