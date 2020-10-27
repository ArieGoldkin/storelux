import React, { useState, useEffect, createRef } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { addToCartRequest } from "./productsActions/addToCartActions";
import { changeUserProducts } from "../userComponents/usersActions/UserActions";

import { getCurrentVatRate } from "../adminComponents/selectors/globalSelectors";
import {
  getAuthUserId,
  getAuthToken,
} from "../userComponents/selectors/AuthSelectors";
import { getCartProductLoading } from "../shoppingCartComponents/selectors/CartSelectors";

import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import CustomAvatar from "../common/UIElements/CustomAvatar";
import Modal from "../common/UIElements/Modal";
import AllProductsItemContent from "./AllProductsItemContent";

import { useStyles } from "./productsCss/AllProductsItemStyle";
import {
  CardMedia,
  CardHeader,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./productsCss/AllProductsItem.css";

const options = ["user products"];
const ITEM_HEIGHT = 48;

const AllProductsItem = (props) => {
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
      <Modal
        show={showProduct}
        onCancel={closeProductHandler}
        header={props.title}
        ref={modalRef}
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
                          onClick={handleMoveToUserItems}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                }
                title={props.creatorName}
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
              <AllProductsItemContent
                price={props.price}
                title={props.title}
                classes={classes}
                description={props.description}
              />
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
    userId: getAuthUserId(state),
    token: getAuthToken(state),
    loading: getCartProductLoading(state),
    vatRate: getCurrentVatRate(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsItem);
