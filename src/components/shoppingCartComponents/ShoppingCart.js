import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import ShoppingCartList from "./ShoppingCartList";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import * as authSelectors from "../userComponents/selectors/AuthSelectors";
import * as cartSelectors from "./selectors/CartSelectors";
import * as actionTypes from "./shoppingCartActions/ShoppingCartActions";
import * as globalSelectors from "../adminComponents/selectors/globalSelectors";
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
  const [isLoading, setIsLoading] = useState(false);

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
    cart: cartSelectors.getCartItems(state),
    loading: cartSelectors.getCartLoading(state),
    error: cartSelectors.getCartError(state),
    userId: authSelectors.getAuthUserId(state),
    token: authSelectors.getAuthToken(state),
    vatRate: globalSelectors.getCurrentVatRate(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCart: (userId, token, vatRate) =>
      dispatch(actionTypes.getCartRequest(userId, token, vatRate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
