import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Card from "../common/UIElements/Card";
import Button from "../common/FormElements/Button";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import {
  getAuthUserId,
  getAuthToken,
} from "../userComponents/selectors/AuthSelectors";
import { getCartProductError } from "./selectors/CartSelectors";
import { getOrderLoading } from "../orderComponents/selectors/OrderSelectors";
import { getCurrentVatRate } from "../adminComponents/selectors/globalSelectors";
import bin from "../../images/bin.png";
import * as actionTypes from "./shoppingCartActions/ShoppingCartActions";
import "../productComponents/productsCss/AllProductsItem.css";
import { CSSTransition } from "react-transition-group";
import "./cartItem.css";

const ShoppingCartItem = (props) => {
  const {
    userId,
    token,
    addQuantity,
    removeQuantity,
    updateProductInCart,
    // productLoading,
    orderLoading,
    productError,
    onDeleteProductCart,
    vatRate,
  } = props;

  const [errorMessage, setErrorMessage] = useState(null);

  const [quantity, setQuantity] = useState(props.quantity);

  const units = props.units;
  const productId = props.id;

  const addQuantityHandler = () => {
    if (quantity !== units) {
      setQuantity(quantity + 1);
      addQuantity(productId);
    }
  };

  const removeQuantityHandler = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      removeQuantity(productId);
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
    // if (productLoading) {
    //   setIsLoading(true);
    // } else {
    //   setIsLoading(false);
    // }
    if (productError) {
      setErrorMessage(productError.error);
    }
  }, [productError]);

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {orderLoading && (
        <div className="loadingSpinnerPosition">
          <LoadingSpinner />
        </div>
      )}
      {!orderLoading && (
        <CSSTransition classNames="fade" timeout={300}>
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
        </CSSTransition>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    userId: getAuthUserId(state),
    token: getAuthToken(state),
    // productLoading: cartSelectors.getCartProductLoading(state),
    productError: getCartProductError(state),
    orderLoading: getOrderLoading(state),
    vatRate: getCurrentVatRate(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addQuantity: (productId) =>
      dispatch(actionTypes.addProductQuantity(productId)),
    removeQuantity: (productId) =>
      dispatch(actionTypes.removeProductQuantity(productId)),
    updateProductInCart: (userId, token, productId, quantity, vatRate) =>
      dispatch(
        actionTypes.setProductQuantityRequest(
          userId,
          token,
          productId,
          quantity,
          vatRate
        )
      ),
    onDeleteProductCart: (token, userId, productId, vatRate) =>
      dispatch(
        actionTypes.deleteProductFromCartRequest(
          token,
          userId,
          productId,
          vatRate
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartItem);
