import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Card from "../common/UIElements/Card";
import ShoppingCartItem from "./ShoppingCartItem";
import ShoppingCartSummary from "./ShoppingCartSummary";
import { getAuthUserId } from "../userComponents/selectors/AuthSelectors";
import {
  getCartItems,
  getCartIsDone,
  getCartSummaryLoading,
  getCartSummary,
} from "./selectors/CartSelectors";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import * as userActions from "../userComponents/usersActions/UserActions";
import { TransitionGroup } from "react-transition-group";

const ShoppingCartList = (props) => {
  const {
    cartItems,
    cartSummaryLoading,
    cartSummary,
    userId,
    loadUser,
    isDone,
  } = props;
  const [totalSum, setTotalSum] = useState(0);
  const [vat, setVat] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (cartSummaryLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    setVat(cartSummary.vat);
    setTotalPrice(cartSummary.totalSum);
    setTotalSum(cartSummary.totalPrice);
  }, [
    cartItems,
    cartSummary.totalPrice,
    cartSummary.totalSum,
    cartSummary.vat,
    cartSummaryLoading,
  ]);

  useEffect(() => {
    if (!isDone) {
      loadUser(userId);
    }
  }, [loadUser, userId, isDone]);

  const clearError = () => {
    setErrorMessage(null);
  };

  if (props.items.length === 0) {
    return (
      <div className="product-list center">
        <Card>
          <h2>No products Found in Cart.</h2>
        </Card>
      </div>
    );
  }
  return (
    <>
      <ul className="product-cart__list">
        {props.items.map((product) => (
          <TransitionGroup
            key={product.id}
            className="product-cart__item"
            component="ul"
          >
            <ShoppingCartItem
              id={product.id}
              image={product.image}
              title={product.title}
              creatorId={product.creator}
              category={product.category}
              price={product.price}
              quantity={product.quantity}
              units={product.units}
              description={product.description}
            />
          </TransitionGroup>
        ))}
      </ul>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {isLoading && (
        <div className="loadingSpinerPosition">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <ShoppingCartSummary
          orderPage={false}
          userId={userId}
          totalPrice={totalSum}
          vat={vat}
          summary={totalPrice}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: getAuthUserId(state),
    cartItems: getCartItems(state),
    isDone: getCartIsDone(state),
    cartSummaryLoading: getCartSummaryLoading(state),
    cartSummary: getCartSummary(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: (userId) => dispatch(userActions.userDataStart(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartList);
