import React, { useState, useEffect, createRef } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { addToCartRequest, changeUserProducts } from "../../../store/actions";
import {
  getGlobalCurrentVatRate,
  getAuthUserId,
  getAuthToken,
  getCartProductLoading,
} from "../../../store/selectors";

import LoadingSpinner from "../../../components/common/UIElements/LoadingSpinner";
import ProductsItemModal from "./ProductsItemModal";
import ProductItemHeader from "../../../components/Products/ItemHeader/ProductItemHeader";
import ProductItemFooter from "../../../components/Products/ItemFooter/ProductItemFooter";
import ProductItemContent from "../../../components/Products/ItemContent/ProductItemContent";

import { useStyles } from "../css/ProductsItemStyle";
import { CardMedia } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const ProductsItem = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const {
    onAddProductToCart,
    userId,
    token,
    loading,
    place,
    vatRate,
    productsUserChange,
  } = props;

  const [isLoading, setIsLoading] = useState(true);

  const [loadingItem, setLoadingItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showProduct, setShowProduct] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const modalRef = createRef();

  const [selectedProduct, setSelectedProduct] = useState({
    productId: props.id,
    title: props.title,
    category: props.category,
    quantity: 1,
    price: props.price,
    units: props.units,
    description: props.description,
    image: props.image,
  });

  const openProductHandler = () => {
    setShowProduct(true);
    setQuantity(quantity);
    setSelectedProduct({
      productId: props.id,
      title: props.title,
      category: props.category,
      price: props.price,
      units: props.units,
      description: props.description,
      image: props.image,
    });
  };

  const closeProductHandler = () => setShowProduct(false);

  const addToCart = (event) => {
    event.preventDefault();
    setLoadingItem(place);
    onAddProductToCart({
      userId,
      token,
      selectedProduct,
      quantity: 1,
      vatRate,
    });
    setIsLoading(true);
  };

  const addQuantityHandler = () => {
    if (quantity !== props.units) {
      setQuantity(quantity + 1);
    }
  };

  const removeQuantityHandler = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addProductToCart = (event) => {
    event.preventDefault();
    setLoadingItem(place);
    setShowProduct(false);
    onAddProductToCart({ userId, token, selectedProduct, quantity, vatRate });
    setIsLoading(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setLoadingItem(null);
    }
  }, [loading]);

  const handleMoveToUserItems = () => {
    productsUserChange();
    history.push(`/${props.creatorId}/products`);
  };

  let currentImage = props.userImage.find((image) => image !== false);

  return (
    <>
      <ProductsItemModal
        showProduct={showProduct}
        close={closeProductHandler}
        title={props.title}
        modalRef={modalRef}
        closeHandler={closeProductHandler}
        addToCart={addProductToCart}
        image={props.image}
        description={props.description}
        price={props.price}
        units={props.units}
        quantity={quantity}
        addQuantityHandler={addQuantityHandler}
        removeQuantityHandler={removeQuantityHandler}
      />
      <Grid item className={classes.itemSize} index={place}>
        {place === loadingItem && isLoading ? (
          <div className={classes.centerSpinner}>
            <LoadingSpinner className={classes.spinner} />
          </div>
        ) : (
          <Paper className={props.className}>
            <div>
              <ProductItemHeader
                image={currentImage}
                click={handleClick}
                anchorEl={anchorEl}
                open={open}
                close={handleClose}
                moveToUserClick={handleMoveToUserItems}
                creatorName={props.creatorName}
                uploadDate={new Date(props.uploadDate).toLocaleDateString()}
              />
              <div className={classes.imageWrapper}>
                <CardMedia
                  component="img"
                  className={classes.media}
                  image={props.image}
                  title={props.title}
                />
              </div>
              <ProductItemContent
                price={props.price}
                title={props.title}
                classes={classes}
                description={props.description}
              />
            </div>
            <ProductItemFooter
              addToCart={addToCart}
              openProduct={openProductHandler}
            />
          </Paper>
        )}
      </Grid>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    userId: getAuthUserId(state),
    token: getAuthToken(state),
    loading: getCartProductLoading(state),
    vatRate: getGlobalCurrentVatRate(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
    productsUserChange: () => dispatch(changeUserProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsItem);
