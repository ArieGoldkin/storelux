import { takeLatest, call, put, fork, take } from "redux-saga/effects";
import * as api from "../../api/adminApi";
import * as actions from "../adminActions/adminActions";
import { toast } from "react-toastify";

function* getGlobalData(action) {
  try {
    const responseData = yield call(api.getData, {
      token: action.payload.token,
    });
    console.log(responseData.data.global);
    yield put(actions.getGlobalDataSuccess(responseData.data.global));
  } catch (err) {
    yield put(
      actions.getGlobalDataFailure({
        error: "Could not load global data, please check connection.",
      })
    );
  }
}

function* watchGetGlobalDataRequest() {
  yield takeLatest(actions.Types.GET_GLOBAL_DATA_REQUEST, getGlobalData);
}

function* updateRate(action) {
  try {
    const responseData = yield call(api.updateRate, {
      vatRate: action.payload.rate,
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

function* watchRateChangeRequest() {
  yield takeLatest(actions.Types.UPDATE_VAT_RATE_REQUEST, updateRate);
}

function* deleteProducts({ products, adminId, token }) {
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

function* watchDeleteRequest() {
  while (true) {
    const deleteAction = yield take(actions.Types.DELETE_PRODUCTS_REQUESET);
    console.log(deleteAction);
    yield call(deleteProducts, {
      products: deleteAction.selectedItems,
      adminId: deleteAction.adminId,
      token: deleteAction.token,
    });
  }
}

const adminSagas = [
  fork(watchDeleteRequest),
  fork(watchGetGlobalDataRequest),
  fork(watchRateChangeRequest),
];

export default adminSagas;
