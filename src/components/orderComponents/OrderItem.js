import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Card from "../common/UIElements/Card";
import Avatar from "../common/UIElements/Avatar";
import Button from "../common/FormElements/Button";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import ErrorModal from "../common/UIElements/ErrorModal";
import Input from "../common/FormElements/Input";
import { useForm } from "../hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../common/util/InputValidators";
import * as authSelectors from "../userComponents/selectors/AuthSelectors";
import * as userSelctors from "../userComponents/selectors/UserSelectors";
import * as orderSelectors from "./selectors/OrderSelectors";
import * as cartSelectors from "../shoppingCartComponents/selectors/CartSelectors";
import * as usersActions from "../userComponents/usersActions/UserActions";
import * as actions from "./orderActions/OrderActions";
import "./ordersCss/order.css";

const OrderItem = ({
  product,
  user,
  orderLoading,
  orderError,
  getUsers,
  usersIsDone,
  token,
  userId,
  orderSummary,
  addNewOrder,
  canRedirect,
  canRemove,
  orderRedirectPath,
  onOrderSuccessRedirectPath,
  onSuccessDeletefromCart,
  seller,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [formState, inputHandler, setFormData] = useForm();
  // console.log(seller);

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
    if (orderLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
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
    // canRemove,
    getUsers,
    onOrderSuccessRedirectPath,
    // onSuccessDeletefromCart,
    orderError,
    orderLoading,
    orderRedirectPath,
    // product.id,
    // token,
    userId,
    usersIsDone,
  ]);

  useEffect(() => {
    if (canRemove && orderLoading) {
      onSuccessDeletefromCart(token, userId, product.id);
    }
  }, [
    canRemove,
    onSuccessDeletefromCart,
    orderLoading,
    product.id,
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
      product,
      firstName,
      email,
      address,
      phone,
      orderSummary
    );
  };

  let orderRedirect = null;
  if (canRedirect) {
    orderRedirect = <Redirect to={orderRedirectPath} />;
  }

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {isLoading && (
        <div className="loadingSpinerOrderPosition">
          <LoadingSpinner />
        </div>
      )}
      {orderRedirect}
      {!isLoading && (
        <Card className="order_item">
          <form onSubmit={onSubmitOrderHandler}>
            <h3 className="order_item_header">Review item and shipping</h3>
            <div className="info-container_order">
              <div className="product-modal_image_item">
                <Avatar
                  className="image_radius"
                  image={product.image}
                  alt={product.title}
                />
              </div>
              <div className="product-modal_content_item">
                <p>{product.description}</p>
                <div className="product-modal_box">
                  <div className="order_info">
                    <p>seller: {}</p>
                    <h3>Price: {product.price + "$"}</h3>
                    <div className="product-modal_qun-orderItem">
                      <div>Quantity:</div>
                      <div>{product.quantity}</div>
                    </div>
                  </div>
                </div>
              </div>
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
                    errorText="Please enter a valid phone Numer"
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
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  // const id = ownProps.product.productId;
  return {
    userId: authSelectors.getAuthUserId(state),
    token: authSelectors.getAuthtoken(state),
    products: cartSelectors.getCartItems(state),
    orderLoading: orderSelectors.getOrderLoading(state),
    orderError: orderSelectors.getOrderError(state),
    usersIsDone: userSelctors.getUsersIsDone(state),
    orderSummary: orderSelectors.getOrderSummary(state),
    canRedirect: orderSelectors.getOrderRedirect(state),
    canRemove: orderSelectors.getOrderCanRemove(state),
    orderRedirectPath: orderSelectors.getOrderRedirectPath(state),

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
    getUsers: () => dispatch(usersActions.getUsersRequest()),
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
        actions.addOrderRequest(
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
      dispatch(actions.setOrderRedirectPath(userId, `/${userId}/shoppingcart`)),
    onSuccessDeletefromCart: (token, userId, productId) =>
      dispatch(
        actions.DeleteFromCartAfterOrderRequest(token, userId, productId)
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);
