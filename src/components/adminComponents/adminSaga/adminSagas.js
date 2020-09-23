import { call, put, fork, take } from "redux-saga/effects";
import * as api from "../../api/adminApi";
import * as actions from "../adminActions/adminActions";
import { toast } from "react-toastify";

function* deleteProducts({ products, adminId, token }) {
  try {
    yield call(api.deleteProducts, { products, adminId, token });
    yield put(actions.DeleteProductsSuccess(products));
    yield toast.info("Products successfuly removed from store.");
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

const adminSagas = [fork(watchDeleteRequest)];

export default adminSagas;
