import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import ProductList from "./ProductList";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import * as userProductsSelectors from "./selectors/UserProductsSelectors";
import * as newProductsSelector from "./selectors/NewProductSelectors";
import * as productsAction from "./productsActions/productsActions";

const UserProducts = ({
  isDone,
  loadUserProducts,
  userProducts,
  redirected,
  loading,
  error,
}) => {
  const [loadedProducts, setLoadedProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [currentUserId, setCurrentUserId] = useState();
  const { userId } = useParams();

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    if (userId !== currentUserId || !isDone || redirected) {
      loadUserProducts(userId);
      setCurrentUserId(userId);
    }
    if (error) {
      setErrorMessage(error.error);
    }
    setLoadedProducts(userProducts);
  }, [
    loadUserProducts,
    userId,
    userProducts,
    isDone,
    redirected,
    loading,
    error,
    currentUserId,
  ]);

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
      {!isLoading && loadedProducts && <ProductList items={loadedProducts} />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userProducts: userProductsSelectors.getUserProducts(state),
    isDone: userProductsSelectors.getUserProductsIsDone(state),
    redirected: newProductsSelector.getNewProductRedirect(state),
    loading: userProductsSelectors.getUserProductsLoading(state),
    error: userProductsSelectors.getUserProductsError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUserProducts: (userId) =>
      dispatch(productsAction.getUserProductRequest(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProducts);
