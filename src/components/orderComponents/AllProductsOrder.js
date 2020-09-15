import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Card from "../common/UIElements/Card";
import Button from "../common/FormElements/Button";
import Input from "../common/FormElements/Input";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import ErrorModal from "../common/UIElements/ErrorModal";
import OrderItemsList from "./OrderItemsList";
import ShoppingCartSummary from "../shoppingCartComponents/ShoppingCartSummary";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../common/util/InputValidators";
import { useForm } from "../hooks/form-hook";
import * as cartSelectors from "../shoppingCartComponents/selectors/CartSelectors";
import * as userSelectors from "../userComponents/selectors/UserSelectors";
import * as authSelectors from "../userComponents/selectors/AuthSelectors";
import * as orderSelectors from "./selectors/OrderSelectors";
import * as actions from "./orderActions/OrderActions";
import "./ordersCss/AllproductsOrder.css";

export const AllProductsOrder = ({
  cartItems,
  user,
  userId,
  token,
  cartSummary,
  setOrder,
  addNewOrder,
  orderLoading,
  orderError,
  canRedirect,
  orderRedirectPath,
  onOrderSuccessRedirectPath,
  onSuccessDeletefromCart,
  isDone,
  orderSet,
  canRemove,
}) => {
  const [formState, inputHandler, setFormData] = useForm();
  const [errorMessage, setErrorMessage] = useState();

  const spinnerPosition = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  useEffect(() => {
    if (!user.address || !user.phone) {
      setFormData(
        {
          address: {
            value: "",
            isValid: false,
          },
          phone: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    } else {
      setFormData(
        {
          firstName: {
            value: user.firstName,
            isValid: true,
          },
          email: {
            value: user.email,
            isValid: true,
          },
          address: {
            value: user.address,
            isValid: true,
          },
          phone: {
            value: user.phone,
            isValid: true,
          },
        },
        true
      );
    }
  }, [setFormData, user.address, user.email, user.firstName, user.phone]);

  useEffect(() => {
    if (!orderSet) {
      setOrder(cartItems);
    }

    if (orderError) {
      setErrorMessage(orderError.error);
    }

    if (!canRedirect && orderRedirectPath !== `/${userId}/shoppingcart`) {
      onOrderSuccessRedirectPath(userId);
    }
  }, [
    cartItems,
    orderError,
    orderLoading,
    setOrder,
    orderSet,
    canRedirect,
    orderRedirectPath,
    userId,
    onOrderSuccessRedirectPath,
  ]);

  useEffect(() => {
    if (canRemove && isDone) {
      onSuccessDeletefromCart(token, userId, cartItems);
    }
  }, [canRemove, cartItems, isDone, onSuccessDeletefromCart, token, userId]);

  const onSubmitOrder = (event) => {
    event.preventDefault();
    const firstName = formState.inputs.firstName.value;
    const email = formState.inputs.email.value;
    const address = formState.inputs.address.value;
    const phone = formState.inputs.phone.value;

    addNewOrder(
      userId,
      token,
      cartItems,
      firstName,
      email,
      address,
      phone,
      cartSummary
    );
  };

  const clearError = () => {
    setErrorMessage(null);
  };

  let orderRedirect = null;
  if (canRedirect && isDone) {
    orderRedirect = <Redirect to={orderRedirectPath} />;
  }

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {orderLoading && (
        <div style={spinnerPosition}>
          <LoadingSpinner />
        </div>
      )}

      {!orderLoading && (
        <>
          {orderRedirect}
          <div className="order_items_wrapper">
            <Card style={{ marginTop: "1rem", width: "68%" }}>
              <form className="all_items_order_form" onSubmit={onSubmitOrder}>
                <div>
                  <h2>Order Summary</h2>
                </div>
                <div className="order_shippment_address">
                  <div className="order_info_left">
                    <div>
                      <p className="shippment_info_title">Name:</p>
                      <Input
                        id="firstName"
                        element="input"
                        type="text"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        errorText="Please enter a valid First Name"
                        initialValue={user.firstName}
                        initialValid={true}
                      />
                    </div>
                    <div>
                      <p className="shippment_info_title">Email:</p>
                      <Input
                        id="email"
                        element="input"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email address."
                        onInput={inputHandler}
                        initialValue={user.email}
                        initialValid={true}
                      />
                    </div>
                  </div>
                  <div className="order_info_right">
                    <div>
                      <p className="shippment_info_title">Shippment Address:</p>
                      <Input
                        id="address"
                        element="input"
                        type="text"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        errorText="Please enter a valid Address"
                        initialValue={user.address}
                      />
                    </div>
                    <div>
                      <p className="shippment_info_title">Contact phone:</p>
                      <Input
                        id="phone"
                        element="input"
                        type="text"
                        validators={[VALIDATOR_MINLENGTH(10)]}
                        onInput={inputHandler}
                        errorText="Please enter a valid phone Numer"
                        initialValue={user.phone}
                      />
                    </div>
                  </div>
                </div>
                <div className="order_button_position">
                  <Button
                    type="submit"
                    buttonClass="product-purchase"
                    disabled={!formState.isValid}
                  >
                    Order Now
                  </Button>
                </div>
              </form>
              <OrderItemsList items={cartItems} />
            </Card>
            <ShoppingCartSummary
              totalPrice={cartSummary.totalPrice}
              vat={cartSummary.vat}
              summary={cartSummary.totalSum}
            />
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: authSelectors.getAuthUserId(state),
    token: authSelectors.getAuthtoken(state),
    cartItems: cartSelectors.getCartItems(state),
    user: userSelectors.getUserItem(state),
    cartSummary: cartSelectors.getCartSummary(state),
    orderLoading: orderSelectors.getOrderLoading(state),
    orderError: orderSelectors.getOrderError(state),
    orderRedirectPath: orderSelectors.getOrderRedirectPath(state),
    isDone: orderSelectors.getOrderIsDone(state),
    canRedirect: orderSelectors.getOrderRedirect(state),
    orderSet: orderSelectors.getOrderIsSet(state),
    canRemove: orderSelectors.getOrderCanRemove(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setOrder: (products) => dispatch(actions.setOrderRequest(products)),
    addNewOrder: (
      userId,
      token,
      cartItems,
      firstName,
      email,
      address,
      phone,
      cartSummary
    ) =>
      dispatch(
        actions.addOrderRequest(
          userId,
          token,
          cartItems,
          firstName,
          email,
          address,
          phone,
          cartSummary
        )
      ),
    onOrderSuccessRedirectPath: (userId) =>
      dispatch(actions.setOrderRedirectPath(userId, `/${userId}/shoppingcart`)),
    onSuccessDeletefromCart: (token, userId, cartItems) =>
      dispatch(actions.DeleteProductsFromCart(token, userId, cartItems)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsOrder);
