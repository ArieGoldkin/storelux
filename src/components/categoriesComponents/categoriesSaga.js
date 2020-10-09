import { takeLatest, call, put, fork } from "redux-saga/effects";
import * as actions from "./categoriesActions";
import * as api from "../api/categoriesApi";
import * as adminAPI from "../api/adminApi";
import { toast } from "react-toastify";

function* getCategoriesRequest() {
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

function* watchGetCategoriesRequest() {
  yield takeLatest(actions.Types.GET_CATEGORIES_REQUEST, getCategoriesRequest);
}

function* AddNewCategory(action) {
  try {
    const responseData = yield call(adminAPI.addCategory, {
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
        error: "Could not add new Category, Category already exists.",
      })
    );
  }
}

function* watchAddCategoryRequest() {
  yield takeLatest(actions.Types.ADD_CATEGORY_REQUEST, AddNewCategory);
}

const categoriesSagas = [
  fork(watchGetCategoriesRequest),
  fork(watchAddCategoryRequest),
];

export default categoriesSagas;
