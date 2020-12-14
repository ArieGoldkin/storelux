import { call, put } from "redux-saga/effects";
import * as api from "../../../api";
import * as actions from "../../actions";

export function* getGlobalData(action) {
  try {
    const responseData = yield call(api.getData, {
      token: action.payload.token,
    });
    yield put(actions.getGlobalDataSuccess(responseData.data.global));
  } catch (err) {
    yield put(
      actions.getGlobalDataFailure({
        error: "Could not load global data, please check connection.",
      })
    );
  }
}
