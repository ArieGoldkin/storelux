import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Card from "../common/UIElements/Card";
import Button from "../common/FormElements/Button";
import Modal from "../common/UIElements/Modal";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import {
  getAuthUserId,
  getAuthToken,
} from "../userComponents/selectors/AuthSelectors";
import {
  getUserProductsLoading,
  getUserProductsError,
} from "./selectors/UserProductsSelectors";

import * as actionTypes from "./productsActions/productsActions";
import "./productsCss/ProductItem.css";

const ProductItem = (props) => {
  const { onDeleteProduct, token, userId, loading, error } = props;
  const [showProduct, setShowProduct] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const openProductHandler = () => setShowProduct(true);

  const closeProductHandler = () => setShowProduct(false);

  const showDeleteHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    setIsLoading(true);

    onDeleteProduct(token, props.id, userId);
  };

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
      // props.onDelete(props.id);
    } else {
      setIsLoading(false);
    }
    if (error) {
      setErrorMessage(error.error);
    }
  }, [error, loading]);

  const clearError = () => {
    setErrorMessage(null);
  };

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      <Modal
        show={showProduct}
        onCancel={closeProductHandler}
        header={props.title}
        contentClass="product-item__modal-content"
        footerClass="product-item__modal-actions"
        footer={<Button onClick={closeProductHandler}>CLOSE</Button>}
      >
        <div className="info-container">
          <h2>PRODUCT!!</h2>
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="product-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this product? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li className="product-item">
        <Card className="product-item__content">
          {isLoading && <LoadingSpinner asOverlay />}

          <div className="product-item__header">
            <h2>{props.title}</h2>
          </div>
          <div className="product-item__info-wrapper">
            <div className="product-item__info">
              <h4>Category: {props.category}</h4>
              <h4>Price:</h4>
              <p>{`$${props.price}`}</p>
              <h4>Units Available:</h4>
              <p>
                {`${props.units}`} {props.units === 1 ? "unit" : "units"}
              </p>
              <h4>Description:</h4>
              <p>{props.description}</p>
            </div>
            <div className="product-item__image">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/${props.image}`}
                alt={props.title}
              />
            </div>
          </div>
          <div className="product-item__actions">
            <Button inverse onClick={openProductHandler}>
              VIEW PRODUCT
            </Button>
            {props.userId === props.creatorId && (
              <Button to={`/product/${props.id}`}>EDIT</Button>
            )}
            {props.userId === props.creatorId && (
              <Button danger onClick={showDeleteHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    userId: getAuthUserId(state),
    token: getAuthToken(state),
    loading: getUserProductsLoading(state),
    error: getUserProductsError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteProduct: (token, productId, userId) =>
      dispatch(actionTypes.deleteProductRequest(token, productId, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
