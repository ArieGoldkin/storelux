import { call, put } from "redux-saga/effects";
import * as api from "../../../api";

import * as actions from "../../actions";

export function* getCategoriesRequest() {
  try {
    const responseData = yield call(api.getCategories);
    yield put(
      actions.getCategoriesSuccess({
        items: responseData.data.categories,
      })
    );
  } catch (e) {
    yield put(
      actions.getCategoriesFailure({
        error: "An error happened when trying get all categories",
      })
    );
  }
}

