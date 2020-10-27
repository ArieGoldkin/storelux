import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import ErrorModal from "../common/UIElements/ErrorModal";
import ProductOrder from "./ProductOrder";
import ShoppingCartSummary from "../shoppingCartComponents/ShoppingCartSummary";
import { getCartItems } from "../shoppingCartComponents/selectors/CartSelectors";
import {
  getAuthUserId,
  getAuthToken,
} from "../userComponents//selectors/AuthSelectors";
import { getUserItem } from "../userComponents/selectors/UserSelectors";
import {
  getOrderSummaryLoading,
  getOrderLoading,
  getOrderSummary,
  getOrderCanRemove,
  getOrderIsDone,
} from "./selectors/OrderSelectors";
import { getCurrentVatRate } from "../adminComponents/selectors/globalSelectors";
import { setOrderRequest } from "./orderActions/OrderActions";
import "./ordersCss/order.css";

const Order = (props) => {
  const {
    products,
    user,
    setOrder,
    orderSummary,
    orderSummaryLoading,
    orderLoading,
    orderIsDone,
    vatRate,
  } = props;
  const { pcartId } = useParams();
  const [totalPrice, setTotalPrice] = useState();
  const [vat, setVat] = useState();
  const [totalSum, setTotalSum] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  let product = products.find((product) => product.id === pcartId);

  useEffect(() => {
    if (!orderIsDone) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    setVat(orderSummary.vat);
    setTotalPrice(orderSummary.totalPrice);
    setTotalSum(orderSummary.totalSum);
  }, [
    orderIsDone,
    orderLoading,
    orderSummary.totalPrice,
    orderSummary.totalSum,
    orderSummary.vat,
    orderSummaryLoading,
  ]);

  const clearError = () => {
    setErrorMessage(null);
  };

  useEffect(() => {
    let productsArr = [];
    productsArr.push(product);
    setOrder(productsArr, vatRate);
  }, [product, setOrder, vatRate]);

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
            <ProductOrder product={product} user={user} />
            <ShoppingCartSummary
              orderPage={true}
              item={product}
              totalPrice={totalSum}
              vat={vat}
              summary={totalPrice}
            />
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: getAuthUserId(state),
    token: getAuthToken(state),
    products: getCartItems(state),
    user: getUserItem(state),
    orderSummaryLoading: getOrderSummaryLoading(state),
    orderLoading: getOrderLoading(state),
    orderSummary: getOrderSummary(state),
    canRemove: getOrderCanRemove(state),
    orderIsDone: getOrderIsDone(state),
    vatRate: getCurrentVatRate(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setOrder: (product, vatRate) => dispatch(setOrderRequest(product, vatRate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
