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
    const deleteAction = yield take(actions.Types.DELETE_PRODUCTS_REQUEST);
    console.log(deleteAction);
    yield call(deleteProducts, {
      products: deleteAction.selectedItems,
      adminId: deleteAction.adminId,
      token: deleteAction.token,
    });
  }
}

function* getOrdersByDate(action) {
  try {
    const responseData = yield call(api.getOrdersByDate, {
      token: action.payload.token,
      adminId: action.payload.adminId,
      fromDate: action.payload.fromSelectedDate,
      toDate: action.payload.ToSelectedDate,
    });
    console.log(responseData);
    yield put(actions.getOrdersByDateSuccess(responseData.data.orders));
  } catch (e) {
    yield put(
      actions.getOrdersByDateFailure({
        error: "Could not get orders from server",
      })
    );
  }
}

function* watchGetOrdersByDateRequest() {
  yield takeLatest(actions.Types.GET_ORDERS_BY_DATE_REQUEST, getOrdersByDate);
}

function* getAllProducts(action) {
  try {
    const responseData = yield call(api.getAllProducts, {
      token: action.payload.token,
      adminId: action.payload.adminId,
    });
    console.log(responseData);
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

function* watchGetAllProductsRequest() {
  yield takeLatest(actions.Types.GET_ALL_PRODUCTS_REQUEST, getAllProducts);
}

function* changeProductStatus(action) {
  try {
    const responseData = yield call(api.productStatusChange, {
      adminId: action.payload.adminId,
      token: action.payload.token,
      productId: action.payload.productId,
    });
    console.log(responseData);
    yield put(actions.changeStatusSuccess(responseData.data.product));
  } catch (e) {
    yield put(
      actions.changeStatusFailure({
        error: "Could not change status, please try again.",
      })
    );
  }
}

function* watchProductStatusChange() {
  yield takeLatest(
    actions.Types.CHANGE_PRODUCT_STATUS_START,
    changeProductStatus
  );
}

function* getOrdersByUserName(action) {
  try {
    const responseData = yield call(api.getOrdersByUserName, {
      token: action.payload.token,
      adminId: action.payload.adminId,
      userName: action.payload.userName,
    });
    console.log(responseData.data);
    yield put(actions.getOrdersByUserNameSuccess(responseData.data.orders));
  } catch (e) {
    yield put(
      actions.getOrdersByUserNameFailure({
        error: "Could not get orders by user name.",
      })
    );
  }
}

function* watchGetOrdersByUserNameRequest() {
  yield takeLatest(
    actions.Types.GET_ORDERS_BY_USER_NAME_REQUEST,
    getOrdersByUserName
  );
}

const adminSagas = [
  fork(watchDeleteRequest),
  fork(watchGetGlobalDataRequest),
  fork(watchRateChangeRequest),
  fork(watchGetOrdersByDateRequest),
  fork(watchGetAllProductsRequest),
  fork(watchProductStatusChange),
  fork(watchGetOrdersByUserNameRequest),
];

export default adminSagas;
