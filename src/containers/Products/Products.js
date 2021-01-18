import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import {
  searchProductsByTitleRequest,
  searchProductsByCategoryRequest,
  getProductsRequest,
  getUsersRequest,
  getCategoriesRequest,
  clearCartErrorMessage,
} from "../../store/actions";

import {
  getCartError,
  getCartProductError,
  getProducts,
  getProductsLoading,
  getProductsError,
  getProductItemLoading,
  getCategoryLoading,
  getUsers,
  getUsersLoading,
  getUsersError,
  getCategories,
} from "../../store/selectors";

import { useStyles } from "./css/ProductsStyle";
import SearchByCategory from "../../components/common/FormElements/SearchByCategory";
import Search from "../../components/common/FormElements/Search";
import LoadingSpinner from "../../components/common/UIElements/LoadingSpinner";
import Button from "../../components/common/FormElements/Button";
import ErrorModal from "../../components/common/UIElements/ErrorModal";
import Pagination from "../../components/common/Pagination/Pagination";
import ProductsList from "../../components/Products/ProductsList/ProductsList";

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
  clearCartErrorMessage,
}) => {
  const classes = useStyles();

  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  //Get current Students
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  //Change page number
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPageNumber = (lastPageNumber) => {
    if (currentPage !== lastPageNumber) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPageNumber = (firstPageNumber) => {
    if (currentPage !== firstPageNumber) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const clearError = () => {
    setErrorMessage(null);
    clearCartErrorMessage();
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
      loadProducts();
    }
    history.push(`/products/page/${currentPage}`);
  }, [currentPage, history, loadProducts, loadingProducts]);

  useEffect(() => {
    if (loadingUsers) {
      loadUsers();
      loadCategories();
    }
  }, [loadCategories, loadUsers, loadingUsers]);

  useEffect(() => {
    if (findByCategoryLoading) {
      findProductByCategory(category);
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
      {loadingProducts && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!loadingProducts && products && users && categories && (
        <div className={classes.root}>
          <div className={classes.contentWrapper}>
            <div className={classes.searchWrapper}>
              <div className={classes.searchBarWrapper}>
                <Search
                  inputStyle={classes.searchBar}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
                <Button
                  buttonClass={classes.getAllBtn}
                  onClick={getAllProducts}
                >
                  All products
                </Button>
              </div>
              <SearchByCategory
                categories={categories}
                setCategory={setCategory}
              />
            </div>
            {itemLoading && (
              <div className={classes.spinnerPosition}>
                <LoadingSpinner />
              </div>
            )}
            {!itemLoading && (
              <>
                <ProductsList products={currentProducts} users={users} />
                <Pagination
                  productsPerPage={productsPerPage}
                  totalProducts={products.length}
                  paginate={paginate}
                  nextPage={nextPageNumber}
                  prevPage={prevPageNumber}
                />
              </>
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
    itemLoading: getProductItemLoading(state),
    users: getUsers(state),
    usersError: getUsersError(state),
    loadingUsers: getUsersLoading(state),
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
    clearCartErrorMessage: () => dispatch(clearCartErrorMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
