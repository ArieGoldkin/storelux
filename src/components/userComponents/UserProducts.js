import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import ProductList from "../productComponents/ProductList";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import {
  getUserProducts,
  getUserProductsIsDone,
  getUserProductsLoading,
  getUserProductsError,
  getCartProductError,
  getAuthUserId,
  getAuthToken,
  getNewProductRedirect,
} from "../../store/selectors";
import { getUserProductRequest, changeUserProducts } from "../../store/actions";


const UserProducts = ({
  loadUserProducts,
  changeLoading,
  userProducts,
  loading,
  error,
  loggedUserId,
  addToCartError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const { userId } = useParams();

  useEffect(() => {
    if (userId === loggedUserId) {
      changeLoading();
    }
  }, [changeLoading, loggedUserId, userId]);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
      loadUserProducts(userId);
    } else {
      setIsLoading(false);
    }
    if (error) {
      setErrorMessage(error.error);
    }
    addToCartError && setErrorMessage(addToCartError);
  }, [addToCartError, error, loadUserProducts, loading, loggedUserId, userId]);

  const clearError = () => {
    setErrorMessage(null);
  };
  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && userProducts && <ProductList items={userProducts} />}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProducts);
