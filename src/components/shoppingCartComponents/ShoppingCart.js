import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import ShoppingCartList from "./ShoppingCartList";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import {
  getAuthUserId,
  getAuthToken,
} from "../userComponents/selectors/AuthSelectors";
import {
  getCartItems,
  getCartLoading,
  getCartError,
} from "./selectors/CartSelectors";
import * as actionTypes from "./shoppingCartActions/ShoppingCartActions";
import { getCurrentVatRate } from "../adminComponents/selectors/globalSelectors";
import "./shoppingCartCss/ShoppingCartList.css";

const ShoppingCart = ({
  userId,
  token,
  loading,
  cart,
  loadCart,
  error,
  vatRate,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      loadCart(userId, token, vatRate);
    }
  }, [loadCart, loading, token, userId, vatRate]);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    if (error) {
      setErrorMessage(error);
    }
  }, [error, loading]);

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
      {!isLoading && cart && (
        <div className="user-cart__wrapper">
          <ShoppingCartList items={cart} />
        </div>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    cart: getCartItems(state),
    loading: getCartLoading(state),
    error: getCartError(state),
    userId: getAuthUserId(state),
    token: getAuthToken(state),
    vatRate: getCurrentVatRate(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCart: (userId, token, vatRate) =>
      dispatch(actionTypes.getCartRequest(userId, token, vatRate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
