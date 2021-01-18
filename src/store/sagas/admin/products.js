import { call, put } from "redux-saga/effects";

import * as api from "../../../api";
import * as actions from "../../actions";
import { toast } from "react-toastify";

export function* deleteProducts({ products, adminId, token }) {
  try {
    yield call(api.deleteProducts, { products, adminId, token });
    yield put(actions.DeleteProductsSuccess(products));
    yield toast.info("Products successfully removed from store.");
  } catch (e) {
    yield put(
      actions.DeleteProductsFailure({
        error: "Could not delete products, Please try again later",
      })
    );
  }
}

export function* getAllProducts(action) {
  try {
    const responseData = yield call(api.getAllProducts, {
      token: action.payload.token,
      adminId: action.payload.adminId,
    });
    const products = responseData.data.products;
    yield put(actions.getAllProductsSuccess({ products }));
  } catch (e) {
    yield put(
      actions.getAllProductsFailure({
        error: "Could not get all products from data base.",
      })
    );
  }
}