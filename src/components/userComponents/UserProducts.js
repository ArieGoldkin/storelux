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
} from "../productComponents/selectors/UserProductsSelectors";
import { getAuthUserId, getAuthToken } from "./selectors/AuthSelectors";
import { getNewProductRedirect } from "../productComponents/selectors/NewProductSelectors";
import { getUserProductRequest } from "../productComponents/productsActions/productsActions";
// import { getPersonalProductsRequest } from "./usersActions/UserActions";

const UserProducts = ({
  loadUserProducts,
  getPersonalProducts,
  userProducts,
  loading,
  error,
  loggedUserId,
  token,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const { userId } = useParams();

  // if (userId === loggedUserId) {
  //   console.log(true);
  // }

  // useEffect(() => {
  //   if (userId === loggedUserId && loading === false) {
  //     setIsLoading(true);
  //     getPersonalProducts({ loggedUserId, token });
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [getPersonalProducts, loading, loggedUserId, token, userId]);
  useEffect(() => {
    if (userId === loggedUserId) {
      setIsLoading(true);
      loadUserProducts(userId);
    } else {
      setIsLoading(false);
    }
  }, [loadUserProducts, loggedUserId, userId]);



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
  }, [error, loadUserProducts, loading, loggedUserId, userId]);

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
    loggedUserId: getAuthUserId(state),
    token: getAuthToken(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUserProducts: (userId) => dispatch(getUserProductRequest(userId)),
    // getPersonalProducts: ({ token, loggedUserId }) =>
    //   dispatch(getPersonalProductsRequest({ token, loggedUserId })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProducts);
