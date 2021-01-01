import React, { useState, useEffect, createRef } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  deleteProductRequest,
  getProductRequest,
  addToCartRequest,
} from "../../../store/actions";

import {
  getGlobalCurrentVatRate,
  getAuthUserId,
  getAuthToken,
  getUserProductsLoading,
  getUserProductsError,
  getUserItemLoading,
} from "../../../store/selectors";

import ProductsItemModal from "../../../components/Products/ProductsItemModal/ProductsItemModal";
import ItemContent from "../../../components/UserProducts/ItemContent/ItemContent";
import Button from "../../../components/common/FormElements/Button";
import Modal from "../../../components/common/UIElements/Modal";
import ErrorModal from "../../../components/common/UIElements/ErrorModal";
import LoadingSpinner from "../../../components/common/UIElements/LoadingSpinner";
import { makeStyles } from "@material-ui/core/styles";
import "../css/ProductItem.css";

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
  const history = useHistory();
  const modalRef = createRef();

  const [showProduct, setShowProduct] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loadingItem, setLoadingItem] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState({});

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
  };

  const showDeleteHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    onDeleteProduct(token, props.id, userId);
  };

  const getProductInfo = () => {
    getProduct(props.id);
    history.push(`/product/${props.id}`);
  };

  useEffect(() => {
    if (!loading && !itemLoading) {
      setLoadingItem(null);
    }
    if (error) {
      setErrorMessage(error.error);
    }
  }, [error, itemLoading, loading]);

  const clearError = () => {
    setErrorMessage(null);
  };

  const productItem = (
    <li index={index} className="product-item">
      {index === loadingItem && !loading ? (
        <div className={classes.spinnerStyle}>
          <LoadingSpinner />
        </div>
      ) : (
        <ItemContent
          userId={props.userId}
          creatorId={props.creatorId}
          title={props.title}
          category={props.category}
          price={props.price}
          units={props.units}
          description={props.description}
          image={props.image}
          openModal={openProductHandler}
          getInfo={getProductInfo}
          deleteModal={showDeleteHandler}
        />
      )}
    </li>
  );

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      <ProductsItemModal
        showProduct={showProduct}
        close={closeProductHandler}
        title={props.title}
        modalRef={modalRef}
        closeHandler={closeProductHandler}
        addToCart={addProductToCart}
        image={`${process.env.REACT_APP_BACKEND_URL}/${props.image}`}
        description={props.description}
        price={props.price}
        units={props.units}
        quantity={quantity}
        setQuantity={setQuantity}
      />
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
      {productItem}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    userId: getAuthUserId(state),
    token: getAuthToken(state),
    loading: getUserProductsLoading(state),
    itemLoading: getUserItemLoading(state),
    error: getUserProductsError(state),
    vatRate: getGlobalCurrentVatRate(state),
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
