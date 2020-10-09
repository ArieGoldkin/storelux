import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import * as addToCartSelectors from "./selectors/AddToCartSelectors";
import * as authSelectors from "../userComponents/selectors/AuthSelectors";
import * as actionTypes from "./productsActions/addToCartActions";

import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import CustomAvatar from "../common/UIElements/CustomAvatar";
import ErrorModal from "../common/UIElements/ErrorModal";
import Modal from "../common/UIElements/Modal";
import { useStyles } from "./productsCss/AllProductsItemNewStyle";
import {
  CardMedia,
  CardHeader,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./productsCss/AllProductsItem.css";

const options = ["user products"];
const ITEM_HEIGHT = 48;

const AllProductsItem = (props) => {
  const classes = useStyles();

  const { onAddProductToCart, userId, token, loading, place } = props;

  const [isLoading, setIsLoading] = useState(true);

  const [loadingItem, setLoadingItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showProduct, setShowProduct] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
    onAddProductToCart({ userId, token, selectedProduct, quantity });
    setIsLoading(true);
  };

  const addQuantityHandler = () => {
    if (quantity !== props.units) {
      setQuantity(quantity + 1);
    }
  };

  const removeQuantityHandler = () => {
    if (quantity) {
      setQuantity(quantity - 1);
    }
  };

  const addProductToCart = (event) => {
    console.log(place);
    event.preventDefault();
    setLoadingItem(place);
    setShowProduct(false);
    onAddProductToCart({ userId, token, selectedProduct, quantity });
    setIsLoading(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const clearError = () => {
    setErrorMessage(null);
  };

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setLoadingItem(null);
    }
  }, [loading]);

  let currentImage = props.userImage.find((image) => image !== false);

  return (
    <>
      <Modal
        show={showProduct}
        onCancel={closeProductHandler}
        header={props.title}
        headerClass="product-modal_header"
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
          <div className="product-modal_image">
            <CustomAvatar
              className="image_radius"
              image={props.image}
              alt={props.title}
            />
          </div>
          <div className="product-modal_content">
            <p>{props.description}</p>
            <div className="product-modal_box">
              <div>
                <h3>Price: {props.price + "$"}</h3>
                <p>Units Available: {props.units}</p>
              </div>
              <div className="product-modal_qun">
                <button className="btn_qun" onClick={addQuantityHandler}>
                  <div className="plus">+</div>
                </button>
                <div>{quantity}</div>
                <button className="btn_qun" onClick={removeQuantityHandler}>
                  <div className="minus">-</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <ErrorModal error={errorMessage} onClear={clearError} />
      <Grid item className={classes.itemSize} index={place}>
        {place === loadingItem && isLoading ? (
          <div className={classes.centerSpinner}>
            <LoadingSpinner className={classes.spinner} />
          </div>
        ) : (
          <Paper className={props.className}>
            <div>
              <CardHeader
                avatar={<Avatar aria-label="recipe" src={currentImage} />}
                action={
                  <>
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: "20ch",
                        },
                      }}
                    >
                      {options.map((option) => (
                        <MenuItem
                          key={option}
                          selected={option === "Pyxis"}
                          onClick={handleClose}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                }
                title={props.creatorId}
                subheader={new Date(props.uploadDate).toLocaleDateString()}
              />
              <div className={classes.imageWrapper}>
                <CardMedia
                  component="img"
                  className={classes.media}
                  image={props.image}
                  title={props.title}
                />
              </div>
              <CardContent className={classes.textContent}>
                <div className={classes.productTitle}>
                  <Typography align="left" variant="h6" component="h2">
                    {props.title}
                  </Typography>
                  <Typography align="left" variant="h6" component="h2">
                    {`$${props.price}`}
                  </Typography>
                </div>
                <Typography
                  align="left"
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  {props.description}
                </Typography>
              </CardContent>
            </div>
            <CardActions>
              <Button size="small" color="primary" onClick={addToCart}>
                Add to cart
              </Button>
              <Button size="small" color="primary" onClick={openProductHandler}>
                View more
              </Button>
            </CardActions>
          </Paper>
        )}
      </Grid>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    userId: authSelectors.getAuthUserId(state),
    token: authSelectors.getAuthToken(state),
    loading: addToCartSelectors.getAddToCartLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddProductToCart: ({ userId, token, selectedProduct, quantity }) =>
      dispatch(
        actionTypes.addToCartRequest({
          userId,
          token,
          selectedProduct,
          quantity,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsItem);
