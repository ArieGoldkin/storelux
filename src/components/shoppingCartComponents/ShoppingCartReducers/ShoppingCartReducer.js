import { Types } from "../shoppingCartActions/ShoppingCartActions";
import { Types as addToCartActions } from "../../productComponents/productsActions/addToCartActions";
import { Types as orderActions } from "../../orderComponents/orderActions/OrderActions";
import { Types as adminActions } from "../../adminComponents/adminActions/adminActions";
import { updateObject } from "../../store/utility";

// import produce from "immer";

const initialState = {
  items: [],
  error: null,
  loading: true,
  isDone: false,
  product: {
    item: [],
    productLoading: false,
    productError: null,
  },
  cartSummary: {
    totalPrice: null,
    vat: null,
    totalSum: null,
    loading: false,
  },
};

const getCartStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    isDone: false,
  });
};

const getCartSuccess = (state, action) => {
  return updateObject(state, {
    items: action.items,
    error: null,
    loading: false,
    isDone: true,
    product: {
      productLoading: false,
    },
    cartSummary: {
      totalPrice: action.cartSum.total,
      vat: action.cartSum.calcVat,
      totalSum: action.cartSum.sum,
      loading: false,
    },
  });
};

const getCartFailure = (state, action) => {
  return updateObject(state, {
    error: action.error.error,
  });
};

const removeProductQuantity = (state, action) => {
  const id = action.productId;
  let findProduct = state.items.find((item) => item.id === id);
  let updatedProduct = updateObject(findProduct, {
    quantity: (findProduct.quantity -= 1),
  });
  const updatedItems = updateObject(state, {
    product: {
      item: updatedProduct,
    },
  });
  return updateObject(state, updatedItems);
};

const addProductQuantity = (state, action) => {
  const id = action.productId;
  let findProduct = state.items.find((item) => item.id === id);
  let updatedProduct = updateObject(findProduct, {
    quantity: (findProduct.quantity += 1),
  });
  const updatedItems = updateObject(state, {
    product: {
      item: updatedProduct,
    },
  });
  return updateObject(state, updatedItems);
};

const updateProductQuantityRequest = (state, action) => {
  return updateObject(state, {
    product: {
      item: state.product.item,
      productLoading: true,
    },
    cartSummary: {
      loading: true,
    },
  });
};
const updateProductQuantitySuccess = (state, action) => {
  return updateObject(state, {
    product: {
      item: state.product.item,
      productLoading: false,
    },
    cartSummary: {
      totalPrice: action.payload.cartSummary.total,
      vat: action.payload.cartSummary.calcVat,
      totalSum: action.payload.cartSummary.sum,
      loading: false,
    },
  });
};

const updateProductQuantityFailure = (state, action) => {
  return updateObject(state, {
    product: {
      productError: action.error,
    },
  });
};

const deleteProductCartRequest = (state, action) => {
  return updateObject(state, {
    product: {
      productLoading: true,
    },
  });
};

const addingProductsToCart = (state, action) => {
  return updateObject(state, {
    isDone: false,
  });
};

const removeItemFromCart = (state, action) => {
  return updateObject(state, {
    loading: true,
    isDone: false,
  });
};

const setCartLoading = (state, action) => {
  return updateObject(state, {
    loading: true,
    isDone: false,
  });
};

export const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_CART_REQUSET:
      return getCartStart(state, action);
    case Types.GET_CART_SUCCESS:
      return getCartSuccess(state, action);
    case Types.GET_CART_FAILURE:
      return getCartFailure(state, action);
    case Types.ADD_PRODUCT_QUANTITY:
      return addProductQuantity(state, action);
    case Types.REMOVE_PRODUCT_QUANTITY:
      return removeProductQuantity(state, action);
    case Types.SET_PRODUCT_QUANTITY_REQUEST:
      return updateProductQuantityRequest(state, action);
    case Types.SET_PRODUCT_QUANTITY_SUCCESS:
      return updateProductQuantitySuccess(state, action);
    case Types.SET_PRODUCT_QUANTITY_FAILURE:
      return updateProductQuantityFailure(state, action);
    case Types.DELETE_FROM_CART_REQUEST:
      return deleteProductCartRequest(state, action);
    case addToCartActions.ADD_TO_CART_REQUEST:
      return addingProductsToCart(state, action);
    case orderActions.ADD_ORDER_REQUEST:
    case adminActions.UPDATE_VAT_RATE_SUCCESS:
      return setCartLoading(state, action);
    case orderActions.REMOVE_ITEMS_FROM_CART_REQUESET:
      return removeItemFromCart(state, action);
    // return setCartLoading(state, action);
    default:
      return state;
  }
};
