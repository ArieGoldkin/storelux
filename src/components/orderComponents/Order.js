import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import ErrorModal from "../common/UIElements/ErrorModal";
import OrderItem from "./OrderItem";
import ShoppingCartSummary from "../shoppingCartComponents/ShoppingCartSummary";
import * as cartSelectors from "../shoppingCartComponents/selectors/CartSelectors";
import * as userSelectors from "../userComponents/selectors/UserSelectors";
import * as orderSelecotrs from "./selectors/OrderSelectors";
import * as actions from "./orderActions/OrderActions";
import "./ordersCss/order.css";

const Order = (props) => {
  const {
    products,
    user,
    setOrder,
    orderSummary,
    orderSummaryLoading,
    orderLoading,
  } = props;
  const { pcartId } = useParams();
  const [totalPrice, setTotalPrice] = useState();
  const [vat, setVat] = useState();
  const [totalSum, setTotalSum] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorNessage] = useState(null);

  let product = products.find((product) => product.id === pcartId);
  // console.log(product);
  // console.log(products);

  useEffect(() => {
    if (orderSummaryLoading || orderLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    setVat(orderSummary.vat);
    setTotalPrice(orderSummary.totalPrice);
    setTotalSum(orderSummary.totalSum);
  }, [
    orderLoading,
    orderSummary.totalPrice,
    orderSummary.totalSum,
    orderSummary.vat,
    orderSummaryLoading,
  ]);

  const clearError = () => {
    setErrorNessage(null);
  };

  useEffect(() => {
    setOrder(product);
  }, [product, setOrder]);

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      <div className="order_wrapper">
        {isLoading && (
          <div className="loadingSpinerPosition loadingOrderPosition">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && (
          <>
            <OrderItem product={product} user={user} />
            <ShoppingCartSummary
              item={product}
              totalPrice={totalPrice}
              vat={vat}
              summary={totalSum}
            />
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: cartSelectors.getCartItems(state),
    user: userSelectors.getUserItem(state),
    orderSummaryLoading: orderSelecotrs.getOrderSummaryLoading(state),
    orderLoading: orderSelecotrs.getOrderLoading(state),
    orderSummary: orderSelecotrs.getOrderSummary(state),
  };
};
const mapDisptachToProps = (dispatch) => {
  return {
    setOrder: (product) => dispatch(actions.setOrderRequest(product)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(Order);
