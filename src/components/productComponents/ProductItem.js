import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  deleteProductRequest,
  getProductRequest,
  addToCartRequest,
} from "../../store/actions";

import {
  getGlobalCurrentVatRate,
  getAuthUserId,
  getAuthToken,
  getUserProductsLoading,
  getUserProductsError,
  getItemLoading,
} from "../../store/selectors";

import ProductModal from "./ProductModal";
import Card from "../common/UIElements/Card";
import Button from "../common/FormElements/Button";
import Modal from "../common/UIElements/Modal";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import { makeStyles } from "@material-ui/core/styles";
import "./productsCss/ProductItem.css";

const useStyles = makeStyles((theme) => ({
  spinnerStyle: {
    alignItems: "center",
    height: "50vh",
    justifyContent: "center",
    display: "flex",
  },
}));

const ProductItem = (props) => {
  const {
    onDeleteProduct,
    token,
    userId,
    loading,
    itemLoading,
    index,
    vatRate,
    error,
    getProduct,
    onAddProductToCart,
  } = props;
  const classes = useStyles();
  const [showProduct, setShowProduct] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingItem, setLoadingItem] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState({});

  const history = useHistory();
  const openProductHandler = () => {
    setShowProduct(true);
    setSelectedProduct({
      productId: props.id,
      title: props.title,
      category: props.category,
      price: props.price,
      units: props.units,
      description: props.description,
      image: `${process.env.REACT_APP_BACKEND_URL}/${props.image}`,
    });
  };

  const closeProductHandler = () => setShowProduct(false);

  const addProductToCart = (event) => {
    event.preventDefault();
    setLoadingItem(index);
    onAddProductToCart({ userId, token, selectedProduct, quantity, vatRate });
    setShowProduct(false);
    setIsLoading(true);
  };

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

  const getProductInfo = () => {
    getProduct(props.id);
    history.push(`/product/${props.id}`);
  };

  useEffect(() => {
    if (loading || itemLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setLoadingItem(null);
    }
    if (error) {
      setErrorMessage(error.error);
    }
  }, [error, itemLoading, loading]);

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
        footer={
          <>
            <Button onClick={closeProductHandler}>CLOSE</Button>
            <Button onClick={addProductToCart}>ADD TO CART</Button>
          </>
        }
      >
        <div className="info-container">
          <ProductModal
            image={`${process.env.REACT_APP_BACKEND_URL}/${props.image}`}
            title={props.title}
            description={props.description}
            price={props.price}
            units={props.units}
            quantity={quantity}
            setQuantity={setQuantity}
          />
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
      <li index={index} className="product-item">
        {index === loadingItem && isLoading ? (
          <div className={classes.spinnerStyle}>
            <LoadingSpinner />
          </div>
        ) : (
          <Card className="product-item__content">
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
                <Button onClick={getProductInfo}>EDIT</Button>
              )}
              {props.userId === props.creatorId && (
                <Button danger onClick={showDeleteHandler}>
                  DELETE
                </Button>
              )}
            </div>
          </Card>
        )}
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
    vatRate: getGlobalCurrentVatRate(state),
    itemLoading: getItemLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteProduct: (token, productId, userId) =>
      dispatch(deleteProductRequest(token, productId, userId)),
    getProduct: (productId) => dispatch(getProductRequest(productId)),
    onAddProductToCart: ({
      userId,
      token,
      selectedProduct,
      quantity,
      vatRate,
    }) =>
      dispatch(
        addToCartRequest({
          userId,
          token,
          selectedProduct,
          quantity,
          vatRate,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
