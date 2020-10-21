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

const addToCartSuccess = (state, action) => {
  console.log(state);
  console.log(action);
  // const index = state.items.findIndex(
  //   (item) => item.id === action.payload.items.id
  // );
  // debugger;
  // let newArray = [...state.items]; // need to map instead, in order to create a correct copy of key value pares
  // if (index !== -1) {
  //   newArray[index].quantity = action.payload.items.quantity;
  // } else {
  //   newArray = action.payload.items;
  // }
  // debugger;
  return updateObject(state, {
    items: action.payload.items,
    loading: false,
    cartSummary: {
      totalPrice: action.payload.cartSum.total,
      vat: action.payload.cartSum.calcVat,
      totalSum: action.payload.cartSum.sum,
      loading: false,
    },
  });
};

const addToCartFailure = (state, action) => {
  return updateObject(state, {
    error: action.payload.error,
    loading: false,
  });
};

const deleteProductCartRequest = (state, action) => {
  return updateObject(state, {
    product: {
      productLoading: true,
    },
    cartSummary: {
      loading: true,
    },
  });
};

const updateCartSummary = (state, action) => {
  return updateObject(state, {
    items: action.payload.items,
    product: {
      productLoading: false,
    },
    cartSummary: {
      totalPrice: action.payload.newCartSummary.total,
      vat: action.payload.newCartSummary.calcVat,
      totalSum: action.payload.newCartSummary.sum,
      loading: false,
    },
  });
};

const addingProductsToCart = (state, action) => {
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
    case Types.GET_CART_REQUEST:
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
    case Types.DELETE_FROM_CART_SUCCESS:
      return updateCartSummary(state, action);
    case addToCartActions.ADD_TO_CART_REQUEST:
      return addingProductsToCart(state, action);
    case addToCartActions.ADD_TO_CART_SUCCESS:
      return addToCartSuccess(state, action);
    case addToCartActions.ADD_TO_CART_FAILURE:
      return addToCartFailure(state, action);
    case orderActions.ADD_ORDER_REQUEST:
    case adminActions.UPDATE_VAT_RATE_SUCCESS:
      return setCartLoading(state, action);
    default:
      return state;
  }
};
