import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import {
  getCartItems,
  getCartIsDone,
  getCartSummaryLoading,
  getCartSummary,
  getAuthUserId,
} from "../../../store/selectors";
import { userDataStart } from "../../../store/actions";

import Card from "../../../components/common/UIElements/Card";
import CartItem from "../CartItem/CartItem";
import CartSummary from "../../../components/ShoppingCart/CartSummary/CartSummary";
import ErrorModal from "../../../components/common/UIElements/ErrorModal";
import LoadingSpinner from "../../../components/common/UIElements/LoadingSpinner";
import "./CartList.css";

const CartList = (props) => {
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
  const [errorMessage, setErrorMessage] = useState(null);

  const prevScrollY = useRef(0);
  const [scrollDown, setScrollDown] = useState(false);

  useEffect(() => {
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current < currentScrollY && !scrollDown) {
        setScrollDown(true);
      }
      if (currentScrollY < 20) {
        setScrollDown(false);
      }
      prevScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollDown]);

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
        {props.items.map((product, index) => (
          <CartItem
            loadingItem={cartSummaryLoading}
            index={index}
            key={product.id}
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
        ))}
      </ul>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {cartSummaryLoading && (
        <div className="loadingSpinnerPosition">
          <LoadingSpinner />
        </div>
      )}
      {!cartSummaryLoading && (
        <CartSummary
          isScrolling={scrollDown}
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
    loadUser: (userId) => dispatch(userDataStart(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
