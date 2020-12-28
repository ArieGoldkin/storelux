import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  getOrdersRequest,
  getCategoriesRequest,
  getProductsRequest,
} from "../../../store/actions";
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
import Card from "../../../components/common/UIElements/Card";
import Button from "../../../components/common/FormElements/Button";
import LoadingSpinner from "../../../components/common/UIElements/LoadingSpinner";
import ErrorModal from "../../../components/common/UIElements/ErrorModal";

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
  spinnerPosition: {
    textAlign: "center",
    display: "flex",
    height: "60vh",
    justifyContent: "center",
    alignItems: "center",
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
  getAllProducts,
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
    if (products.length === 0) {
      getAllProducts();
    }
  }, [
    adminId,
    getOrders,
    chartLoading,
    token,
    products.length,
    getAllProducts,
  ]);

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
          <div className={classes.spinnerPosition}>
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
    getAllProducts: () => dispatch(getProductsRequest()),
  };
};

export default connect(mapStateToProps, MapDispatchToProps)(TrafficChartsList);
