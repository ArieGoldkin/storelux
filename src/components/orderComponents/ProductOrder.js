import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  getUsersRequest,
  addOrderRequest,
  setOrderRedirectPath,
  DeleteFromCartAfterOrderRequest,
} from "../../store/actions";
import {
  getAuthUserId,
  getAuthToken,
  getCartItems,
  getOrderLoading,
  getOrderError,
  getOrderItems,
  getUsersIsDone,
  getOrderSummary,
  getOrderRedirect,
  getOrderCanRemove,
  getOrderIsDone,
  getOrderRedirectPath,
} from "../../store/selectors";

import Card from "../common/UIElements/Card";
import Button from "../common/FormElements/Button";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import ErrorModal from "../common/UIElements/ErrorModal";
import Input from "../common/FormElements/Input";
import OrderItem from "./OrderItem";
import { useForm } from "../hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../common/util/InputValidators";
import "./ordersCss/order.css";

const ProductOrder = ({
  orderItems,
  product,
  user,
  orderLoading,
  orderError,
  getUsers,
  usersIsDone,
  token,
  userId,
  orderSummary,
  isDone,
  addNewOrder,
  canRedirect,
  canRemove,
  orderRedirectPath,
  onOrderSuccessRedirectPath,
  onSuccessDeleteFromCart,
}) => {
  const [errorMessage, setErrorMessage] = useState();
  const [formState, inputHandler, setFormData] = useForm();

  useEffect(() => {
    if (!user.address || !user.phone) {
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
    // if (orderLoading) {
    //   setIsLoading(true);
    // } else {
    //   setIsLoading(false);
    // }
    if (orderError) {
      setErrorMessage(orderError.error);
    }
    if (!usersIsDone) {
      getUsers();
    }
    if (!canRedirect && orderRedirectPath !== `/${userId}/shoppingcart`) {
      onOrderSuccessRedirectPath(userId);
    }
  }, [
    canRedirect,
    getUsers,
    onOrderSuccessRedirectPath,
    orderError,
    orderLoading,
    orderRedirectPath,
    userId,
    usersIsDone,
  ]);

  useEffect(() => {
    if (canRemove && orderLoading) {
      onSuccessDeleteFromCart(token, userId, product);
    }
  }, [
    canRemove,
    onSuccessDeleteFromCart,
    orderLoading,
    product,
    token,
    userId,
  ]);

  const clearError = () => {
    setErrorMessage(null);
  };

  const onSubmitOrderHandler = (event) => {
    event.preventDefault();
    const firstName = formState.inputs.firstName.value;
    const email = formState.inputs.email.value;
    const address = formState.inputs.address.value;
    const phone = formState.inputs.phone.value;

    addNewOrder(
      userId,
      token,
      orderItems,
      firstName,
      email,
      address,
      phone,
      orderSummary
    );
  };

  let orderRedirect = null;
  if (canRedirect && isDone) {
    orderRedirect = <Redirect to={orderRedirectPath} />;
  }

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {orderLoading && (
        <div className="loadingSpinerOrderPosition">
          <LoadingSpinner />
        </div>
      )}
      {!orderLoading && (
        <>
          {orderRedirect}
          <Card className="order_item">
            <form onSubmit={onSubmitOrderHandler}>
              <h3 className="order_item_header">Review item and shipping</h3>
              <div className="info-container_order">
                <OrderItem product={product} />
                <div className="shippment_address">
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
                      errorText="Please enter a valid phone Number"
                      initialValue={user.phone}
                    />
                  </div>
                </div>
              </div>
              <div className="button_position">
                <Button
                  type="submit"
                  buttonClass="product-purchase"
                  disabled={!formState.isValid}
                >
                  Order Now
                </Button>
              </div>
            </form>
          </Card>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: getAuthUserId(state),
    token: getAuthToken(state),
    products: getCartItems(state),
    orderLoading: getOrderLoading(state),
    orderError: getOrderError(state),
    orderItems: getOrderItems(state),
    usersIsDone: getUsersIsDone(state),
    orderSummary: getOrderSummary(state),
    canRedirect: getOrderRedirect(state),
    canRemove: getOrderCanRemove(state),
    isDone: getOrderIsDone(state),
    orderRedirectPath: getOrderRedirectPath(state),

    // need to fix problem
    // seller: state.users.items.find((user) =>
    //   user.products.find((product) =>
    //     product === id ? user.firstName + " " + user.lastName : null
    //   )
    // ),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(getUsersRequest()),
    addNewOrder: (
      userId,
      token,
      product,
      firstName,
      email,
      address,
      phone,
      orderSummary
    ) =>
      dispatch(
        addOrderRequest(
          userId,
          token,
          product,
          firstName,
          email,
          address,
          phone,
          orderSummary
        )
      ),
    onOrderSuccessRedirectPath: (userId) =>
      dispatch(setOrderRedirectPath(userId, `/${userId}/shoppingcart`)),
    onSuccessDeleteFromCart: (token, userId, product) =>
      dispatch(DeleteFromCartAfterOrderRequest(token, userId, product)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductOrder);
