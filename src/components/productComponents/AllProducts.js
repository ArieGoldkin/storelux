import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import AllProductsList from "./AllProductsList";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import Card from "../common/UIElements/Card";
import Search from "../common/FormElements/Search";
import * as userSelectors from "../userComponents/selectors/UserSelectors";
import * as allProductsSelectors from "./selectors/AllProductsSelectors";
import * as addToCartSelectors from "./selectors/AddToCartSelectors";
import * as adminSelectors from "../adminComponents/selectors/adminSelectors";
import * as productsAction from "./productsActions/productsActions";
import * as usersAction from "../userComponents/usersActions/UserActions";

const AllProducts = ({
  loadProducts,
  loadUsers,
  products,
  productsDone,
  usersDone,
  users,
  usersError,
  productsError,
  loadingProducts,
  loadingUsers,
  addToCart,
  globalError,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (!usersDone && !productsDone) {
      loadUsers();
      loadProducts();
    } else if (!productsDone) {
      loadProducts();
    } else if (!usersDone) {
      loadUsers();
    }
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, [loadProducts, loadUsers, productsDone, usersDone]);

  useEffect(() => {
    if (loadingProducts || loadingUsers || addToCart.loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    if (usersError) {
      setErrorMessage(usersError.error);
    }
    if (productsError) {
      setErrorMessage(productsError.error);
    }
    if (globalError) {
      setErrorMessage(globalError.error);
    }
    if (addToCart.error) {
      setErrorMessage(addToCart.error);
    }
  }, [
    addToCart,
    globalError,
    loadingProducts,
    loadingUsers,
    productsError,
    usersError,
  ]);

  const clearError = () => {
    setErrorMessage(null);
  };

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && products && (
        <div className="products-list__table">
          <Card>
            <Search searchValue={searchValue} setSearchValue={setSearchValue} />
            <AllProductsList
              products={products}
              searchValue={searchValue}
              users={users}
            />
          </Card>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    usersDone: userSelectors.getUsersIsDone(state),
    productsDone: allProductsSelectors.getProductsIsDone(state),
    failure: allProductsSelectors.getProductsFailure(state),
    products: allProductsSelectors.getProducts(state),
    loadingProducts: allProductsSelectors.getProductsLoading(state),
    users: userSelectors.getUsers(state),
    loadingUsers: userSelectors.getUsersLoading(state),
    usersError: userSelectors.getUsersError(state),
    productsError: allProductsSelectors.getProductsError(state),
    addToCart: addToCartSelectors.getAddToCartState(state),
    globalError: adminSelectors.getError(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: () => dispatch(productsAction.getProductsRequest()),
    loadUsers: () => dispatch(usersAction.getUsersRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
