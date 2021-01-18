import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Card from "../../../components/common/UIElements/Card";
import Button from "../../../components/common/FormElements/Button";
import ErrorModal from "../../../components/common/UIElements/ErrorModal";
import LoadingSpinner from "../../../components/common/UIElements/LoadingSpinner";

import {
  getAuthUserId,
  getAuthToken,
  getCartProductError,
  getOrderLoading,
  getGlobalCurrentVatRate,
} from "../../../store/selectors";

import {
  addProductQuantity,
  removeProductQuantity,
  setProductQuantityRequest,
  deleteProductFromCartRequest,
} from "../../../store/actions";

import bin from "../../../images/bin.png";
import "./CartItem.css";

const CartItem = (props) => {
  const {
    userId,
    token,
    addQuantity,
    removeQuantity,
    updateProductInCart,
    loadingItem,
    index,
    productError,
    onDeleteProductCart,
    vatRate,
  } = props;

  const [errorMessage, setErrorMessage] = useState(null);
  const [quantity, setQuantity] = useState(props.quantity);
  const [currentItem, setCurrentItem] = useState(null);
  const units = props.units;
  const productId = props.id;

  const addQuantityHandler = () => {
    if (quantity !== units) {
      setQuantity(quantity + 1);
      addQuantity(productId);
      setCurrentItem(index);
    }
  };

  const removeQuantityHandler = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      removeQuantity(productId);
      setCurrentItem(index);
    }
  };
  const deleteProductFromCart = () => {
    onDeleteProductCart(token, userId, productId, vatRate);
  };

  const clearError = () => {
    setErrorMessage(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (quantity !== props.quantity) {
        updateProductInCart(userId, token, productId, quantity, vatRate);
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [
    productId,
    props.quantity,
    quantity,
    token,
    updateProductInCart,
    userId,
    vatRate,
  ]);

  useEffect(() => {
    if (productError) {
      setErrorMessage(productError.error);
    }
    if (!loadingItem) {
      setCurrentItem(null);
    }
  }, [loadingItem, productError]);

  const cartItem = (
    <li className="product-cart__item">
      <Card className="product-cart__content">
        <div className="product-cart__description">
          <div className="product-cart__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="product-cart__info">
            <h4>{props.title}</h4>
            <p>Category: {props.category}</p>
            <p>{props.description}</p>
            <h3>Price: {`$${props.price}`}</h3>
          </div>
        </div>

        <div className="product-cart__sum">
          <div className="product-cart_qun">
            {index === currentItem && loadingItem && (
              <div className="spinner-wrapper">
                <LoadingSpinner />
              </div>
            )}
            <div className="product-cart_qun-content">
              <button className="btn_qun" onClick={addQuantityHandler}>
                <div className="plus">+</div>
              </button>
              <div>{quantity}</div>
              <button className="btn_qun" onClick={removeQuantityHandler}>
                <div className="minus">-</div>
              </button>
            </div>
            <button
              className="product-cart__delete-item"
              onClick={deleteProductFromCart}
            >
              <img src={bin} alt="delete" />
            </button>
          </div>
          <Button
            to={`/${userId}/shoppingCart/${props.id}`}
            buttonClass="product-purchase"
          >
            Order Item
          </Button>
        </div>
      </Card>
    </li>
  );

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {/* {orderLoading && (
        <div className="loadingSpinnerPosition">
          <LoadingSpinner />
        </div>
      )} */}
      {cartItem}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    userId: getAuthUserId(state),
    token: getAuthToken(state),
    productError: getCartProductError(state),
    orderLoading: getOrderLoading(state),
    vatRate: getGlobalCurrentVatRate(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addQuantity: (productId) => dispatch(addProductQuantity(productId)),
    removeQuantity: (productId) => dispatch(removeProductQuantity(productId)),
    updateProductInCart: (userId, token, productId, quantity, vatRate) =>
      dispatch(
        setProductQuantityRequest(userId, token, productId, quantity, vatRate)
      ),
    onDeleteProductCart: (token, userId, productId, vatRate) =>
      dispatch(deleteProductFromCartRequest(token, userId, productId, vatRate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
