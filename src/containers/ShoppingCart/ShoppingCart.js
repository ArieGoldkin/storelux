import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import CartList from "./CartList/CartList";
import ErrorModal from "../../components/common/UIElements/ErrorModal";
import LoadingSpinner from "../../components/common/UIElements/LoadingSpinner";

import {
  getAuthUserId,
  getAuthToken,
  getCartItems,
  getCartLoading,
  getCartError,
  getGlobalCurrentVatRate,
} from "../../store/selectors";

import { getCartRequest } from "../../store/actions";
import "./ShoppingCart.css";

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
          <CartList items={cart} />
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
    vatRate: getGlobalCurrentVatRate(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCart: (userId, token, vatRate) =>
      dispatch(getCartRequest(userId, token, vatRate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
