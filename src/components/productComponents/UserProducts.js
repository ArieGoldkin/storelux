import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import ProductList from "./ProductList";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import {
  getUserProducts,
  getUserProductsIsDone,
  getUserProductsLoading,
  getUserProductsError,
} from "./selectors/UserProductsSelectors";
import { getNewProductRedirect } from "./selectors/NewProductSelectors";
import * as productsAction from "./productsActions/productsActions";

const UserProducts = ({
  loadUserProducts,
  userProducts,
  loading,
  error,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const { userId } = useParams();

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
  }, [error, loadUserProducts, loading, userId]);

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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUserProducts: (userId) =>
      dispatch(productsAction.getUserProductRequest(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProducts);
