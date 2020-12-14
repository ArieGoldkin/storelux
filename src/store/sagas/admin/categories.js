import { call, put } from "redux-saga/effects";
import * as api from "../../../api";

import * as actions from "../../actions";
import { toast } from "react-toastify";

export function* AddNewCategory(action) {
  try {
    const responseData = yield call(api.addCategory, {
      adminId: action.adminId,
      token: action.token,
      name: action.category,
    });
    console.log(responseData.data);
    yield put(actions.addCategorySuccess(responseData.data));
    yield toast.info("New Category added successfully.");
  } catch (e) {
    yield put(
      actions.addCategoryFailure({
        error:
          "Could not add new Category, Category already exists or please log in as admin.",
      })
    );
  }
}
