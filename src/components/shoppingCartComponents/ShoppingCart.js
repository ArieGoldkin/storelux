import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import ShoppingCartList from "./ShoppingCartList";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import * as authSelectors from "../userComponents/selectors/AuthSelectors";
import * as cartSelecotrs from "./selectors/CartSelectors";
import * as actionTypes from "./shoppingCartActions/ShoppingCartActions";
import * as adminSelectors from "../adminComponents/selectors/adminSelectors";
import "./shoppingCartCss/ShoppingCartList.css";

const ShoppingCart = ({
  userId,
  token,
  loading,
  cart,
  isDone,
  loadCart,
  error,
  loadVatRate,
  vatRate,
}) => {
  const [errorMessage, setErrorNessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isDone) {
      loadCart(userId, token, vatRate);
    }
  }, [isDone, loadCart, token, userId, loadVatRate, vatRate]);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    if (error) {
      setErrorNessage(error);
    }
  }, [error, loading]);

  const clearError = () => {
    setErrorNessage(null);
  };

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <div className="user-cart__wrapper">
          <ShoppingCartList items={cart} />
        </div>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    cart: cartSelecotrs.getCartItems(state),
    loading: cartSelecotrs.getCartLoading(state),
    error: cartSelecotrs.getCartError(state),
    isDone: cartSelecotrs.getCartIsDone(state),
    userId: authSelectors.getAuthUserId(state),
    token: authSelectors.getAuthtoken(state),
    vatRate: adminSelectors.getCurrentVatRate(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCart: (userId, token, vatRate) =>
      dispatch(actionTypes.getCartRequest(userId, token, vatRate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
