import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getOrdersRequest, getCategoriesRequest } from "../../../store/actions";
import {
  getAuthUserId,
  getAuthToken,
  getProducts,
  getCategoriesLoading,
  getCategories,
  getAllOrdersError,
  getAllOrders,
  chartLoading,
} from "../../../store/selectors";

import { makeStyles } from "@material-ui/core/styles";
import Card from "../../common/UIElements/Card";
import Button from "../../common/FormElements/Button";
import LoadingSpinner from "../../common/UIElements/LoadingSpinner";
import ErrorModal from "../../common/UIElements/ErrorModal";

import MonthlyOrders from "./MonthlyOrders";
import ProductInventory from "./ProductInventory";

const styles = makeStyles({
  root: {
    width: "60%",
    margin: "1rem auto",
  },
  buttonMargin: {
    marginTop: "1rem",
  },
});

const TrafficChartsList = ({
  token,
  adminId,
  categories,
  orders,
  chartLoading,
  getOrders,
  orderError,
  products,
  categoryLoading,
  getCategories,
}) => {
  const classes = styles();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentChart, setCurrentChart] = useState("orders");

  const changeToCategoriesSale = () => {
    setCurrentChart("ProductInventory");
  };

  const changeToMonthlyOrders = () => {
    setCurrentChart("orders");
  };

  const clearError = () => {
    setErrorMessage(null);
  };

  useEffect(() => {
    if (chartLoading) {
      setIsLoading(true);
      getOrders({ adminId, token });
    } else {
      setIsLoading(false);
    }
  }, [adminId, getOrders, chartLoading, token]);

  useEffect(() => {
    categoryLoading && getCategories();
  }, [categoryLoading, getCategories]);

  useEffect(() => {
    orderError && setErrorMessage(orderError.error);
  }, [orderError]);

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      <Card className={classes.root}>
        {isLoading && (
          <div className="center">
            <LoadingSpinner style={{ marginTop: "6rem" }} />
          </div>
        )}
        {!isLoading && orders && currentChart === "orders" && (
          <MonthlyOrders orders={orders} />
        )}
        {!isLoading && currentChart === "ProductInventory" && (
          <ProductInventory categories={categories} products={products} />
        )}
        <div className={classes.buttonMargin}>
          <Button onClick={changeToMonthlyOrders}>Monthly Orders</Button>
          <Button onClick={changeToCategoriesSale}>Inventory Products</Button>
        </div>
      </Card>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    adminId: getAuthUserId(state),
    token: getAuthToken(state),
    categoryLoading: getCategoriesLoading(state),
    categories: getCategories(state),
    products: getProducts(state),
    chartLoading: chartLoading(state),
    orderError: getAllOrdersError(state),
    orders: getAllOrders(state).map((order) => {
      return {
        month: new Date(order.createdAt).getMonth(),
        year: new Date(order.createdAt).getFullYear(),
      };
    }),
  };
};
const MapDispatchToProps = (dispatch) => {
  return {
    getOrders: ({ adminId, token }) =>
      dispatch(getOrdersRequest({ adminId, token })),
    getCategories: () => dispatch(getCategoriesRequest()),
  };
};

export default connect(mapStateToProps, MapDispatchToProps)(TrafficChartsList);
