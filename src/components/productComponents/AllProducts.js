import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  searchProductsByTitleRequest,
  searchProductsByCategoryRequest,
} from "../productComponents/productsActions/SearchProductsActions";
import { getProductsRequest } from "./productsActions/productsActions";
import { getUsersRequest } from "../userComponents/usersActions/UserActions";
import { getCategoriesRequest } from "../categoriesComponents/categoriesActions";
import {
  getCartError,
  getCartProductError,
} from "../shoppingCartComponents/selectors/CartSelectors";
import {
  getProducts,
  getProductsLoading,
  getProductsError,
  getItemLoading,
  getCategoryLoading,
} from "./selectors/AllProductsSelectors";
import {
  getUsers,
  getUsersLoading,
  getUsersError,
} from "../userComponents/selectors/UserSelectors";
import { getCategories } from "../categoriesComponents/categoriesSelectors";

import { useStyles } from "./productsCss/AllProductsStyle";
import SearchByCategory from "../common/FormElements/SearchByCategory";
import Search from "../common/FormElements/Search";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import Button from "../common/FormElements/Button";
import ErrorModal from "../common/UIElements/ErrorModal";

import AllProductsList from "./AllProductsList";

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
  shoppingCartError,
  productError,
  categories,
  loadCategories,
  findProductByCategory,
  findByCategoryLoading,
}) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState();

  const clearError = () => {
    setErrorMessage(null);
  };

  const getAllProducts = () => {
    loadProducts();
  };

  useEffect(() => {
    if (itemLoading) {
      const timer = setTimeout(() => {
        loadSearchedProducts(searchValue);
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [itemLoading, loadSearchedProducts, searchValue]);

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
      loadCategories();
    } else {
      setIsLoading(false);
    }
  }, [category, loadCategories, loadUsers, loadingUsers]);

  useEffect(() => {
    if (findByCategoryLoading) {
      setLoadingItems(true);
      findProductByCategory(category);
    } else {
      setLoadingItems(false);
    }
  }, [category, findByCategoryLoading, findProductByCategory]);

  useEffect(() => {
    usersError && setErrorMessage(usersError.error);
    productsError && setErrorMessage(productsError.error);
    shoppingCartError && setErrorMessage(shoppingCartError);
    productError && setErrorMessage(productError);
  }, [shoppingCartError, productsError, usersError, productError]);

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && products && users && categories && (
        <div className={classes.root}>
          <div className={classes.contentWrapper}>
            <div className={classes.searchWrapper}>
              <Search
                inputStyle={classes.searchBar}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
              <SearchByCategory
                categories={categories}
                setCategory={setCategory}
              />
              <Button buttonClass={classes.getAllBtn} onClick={getAllProducts}>
                All products
              </Button>
            </div>
            {loadingItems && (
              <div className={classes.spinnerPosition}>
                <LoadingSpinner />
              </div>
            )}
            {!loadingItems && (
              <AllProductsList products={products} users={users} />
            )}
          </div>
        </div>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    products: getProducts(state),
    loadingProducts: getProductsLoading(state),
    productsError: getProductsError(state),
    itemLoading: getItemLoading(state),
    users: getUsers(state),
    loadingUsers: getUsersLoading(state),
    usersError: getUsersError(state),
    shoppingCartError: getCartError(state),
    productError: getCartProductError(state),
    categories: getCategories(state),
    findByCategoryLoading: getCategoryLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: () => dispatch(getProductsRequest()),
    loadUsers: () => dispatch(getUsersRequest()),
    loadSearchedProducts: (searchValue) =>
      dispatch(searchProductsByTitleRequest(searchValue)),
    loadCategories: () => dispatch(getCategoriesRequest()),
    findProductByCategory: (category) =>
      dispatch(searchProductsByCategoryRequest(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
