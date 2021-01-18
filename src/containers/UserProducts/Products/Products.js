import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import ProductList from "../../../components/UserProducts/ProductsList/ProductsList";
import ErrorModal from "../../../components/common/UIElements/ErrorModal";
import LoadingSpinner from "../../../components/common/UIElements/LoadingSpinner";
import {
  getUserProducts,
  getUserProductsIsDone,
  getUserProductsLoading,
  getUserProductsError,
  getCartProductError,
  getAuthUserId,
  getAuthToken,
  getNewProductRedirect,
} from "../../../store/selectors";
import {
  getUserProductRequest,
  changeUserProducts,
  clearCartErrorMessage,
} from "../../../store/actions";

const UserProducts = ({
  loadUserProducts,
  changeLoading,
  userProducts,
  loading,
  error,
  loggedUserId,
  addToCartError,
  clearErrorMessage,
}) => {

  const { userId } = useParams();

  useEffect(() => {
    if (userId === loggedUserId) {
      changeLoading();
    }
  }, [changeLoading, loggedUserId, userId]);

  useEffect(() => {
    if (loading) {
      loadUserProducts(userId);
    }
  }, [loadUserProducts, loading, userId]);

  const clearError = () => {
    clearErrorMessage();
  };

  let errorMessage = null;

  if (addToCartError) {
    errorMessage = addToCartError;
  } else if (error) {
    errorMessage = error.error;
  }

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {loading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!loading && userProducts && <ProductList items={userProducts} />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userProducts: getUserProducts(state),
    isDone: getUserProductsIsDone(state),
    redirected: getNewProductRedirect(state),
    loading: getUserProductsLoading(state),
    error: getUserProductsError(state),
    addToCartError: getCartProductError(state),
    loggedUserId: getAuthUserId(state),
    token: getAuthToken(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUserProducts: (userId) => dispatch(getUserProductRequest(userId)),
    changeLoading: () => dispatch(changeUserProducts()),
    clearErrorMessage: () => dispatch(clearCartErrorMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProducts);
