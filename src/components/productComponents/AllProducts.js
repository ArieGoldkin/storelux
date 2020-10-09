import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import * as searchActions from "../productComponents/productsActions/SearchProductsActions";
import * as productsAction from "./productsActions/productsActions";
import * as usersAction from "../userComponents/usersActions/UserActions";
import * as allProductsSelectors from "./selectors/AllProductsSelectors";
import * as userSelectors from "../userComponents/selectors/UserSelectors";
import { makeStyles } from "@material-ui/core/styles";
import Search from "../common/FormElements/Search";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import ErrorModal from "../common/UIElements/ErrorModal";
import AllProductsList from "./AllProductsList";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "80%",
    margin: "0 auto",
    "& > *": {
      margin: "1rem",
      //   width: theme.spacing(16),
      //   height: theme.spacing(16),
    },
  },
  spinnerPosition: {
    textAlign: "center",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const AllProducts = ({
  products,
  users,
  loadingProducts,
  loadProducts,
  loadUsers,
  loadingUsers,
  usersError,
  productsError,
  loadSearchedProducts,
  itemLoading,
}) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [searchValue, setSearchValue] = useState("");

  const clearError = () => {
    setErrorMessage(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadSearchedProducts(searchValue);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [loadSearchedProducts, searchValue]);

  useEffect(() => {
    if (loadingProducts) {
      setIsLoading(true);
      loadProducts();
    } else {
      setIsLoading(false);
    }
    itemLoading ? setLoadingItems(true) : setLoadingItems(false);
  }, [itemLoading, loadProducts, loadingProducts]);

  useEffect(() => {
    if (loadingUsers) {
      setIsLoading(true);
      loadUsers();
    } else {
      setIsLoading(false);
    }
  }, [loadUsers, loadingUsers]);

  useEffect(() => {
    usersError && setErrorMessage(usersError.error);
    productsError && setErrorMessage(productsError.error);
  }, [productsError, usersError]);

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && products && users && (
        <div className={classes.root}>
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
          {loadingItems && (
            <div className={classes.spinnerPosition}>
              <LoadingSpinner />
            </div>
          )}
          {!loadingItems && (
            <AllProductsList products={products} users={users} />
          )}
        </div>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    products: allProductsSelectors.getProducts(state),
    loadingProducts: allProductsSelectors.getProductsLoading(state),
    productsError: allProductsSelectors.getProductsError(state),
    users: userSelectors.getUsers(state),
    loadingUsers: userSelectors.getUsersLoading(state),
    usersError: userSelectors.getUsersError(state),
    itemLoading: allProductsSelectors.getItemLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: () => dispatch(productsAction.getProductsRequest()),
    loadUsers: () => dispatch(usersAction.getUsersRequest()),
    loadSearchedProducts: (searchValue) =>
      dispatch(searchActions.searchProductsByTitleRequest(searchValue)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
