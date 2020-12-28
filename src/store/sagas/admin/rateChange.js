import { call, put } from "redux-saga/effects";

import * as api from "../../../api";
import * as actions from "../../actions";
import { toast } from "react-toastify";

export function* updateRate(action) {
  try {
    const responseData = yield call(api.updateRate, {
      vatRate: action.payload.newRate,
      adminId: action.payload.adminId,
      token: action.payload.token,
    });
    const vatRate = yield responseData.data.globalData.vatRate;

    yield put(actions.updateRateSuccess(vatRate));
    yield toast.info("Vat rate changed successfully in store.");
  } catch (err) {
    yield put(
      actions.updateRateFailure({
        error: "Server Error on update rate.",
      })
    );
  }
}
