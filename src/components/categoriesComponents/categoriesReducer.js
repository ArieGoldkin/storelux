import { Types } from "./categoriesActions";
import { updateObject } from "../store/utility";

const initialState = {
  items: [],
  error: null,
  loading: true,
  isDone: false,
};

const requestCategoriesStart = (state, action) => {
  return updateObject(state, { error: null, loading: true, isDone: false });
};

const requestCategoriesSuccess = (state, action) => {
  return updateObject(state, {
    items: action.categories.items,
    error: null,
    loading: false,
    isDone: true,
  });
};
const getCategoriesFailure = (state, action) => {
  return updateObject(state, {
    error: action.error.error,
    loading: false,
    isDone: true,
  });
};

const addCategoryRequest = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    // isDone: false,
  });
};

const addCategorySuccess = (state, action) => {
  console.log(action);
  // console.log(state.items);
  return updateObject(state, {
    items: state.items.concat(action.category),
    loading: false,
    isDone: true,
  });
};

const addCategoryFailure = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isDone: true,
  });
};

export default function categories(state = initialState, action) {
  switch (action.type) {
    case Types.GET_CATEGORIES_REQUEST:
      return requestCategoriesStart(state, action);
    case Types.GET_CATEGORIES_SUCCESS:
      return requestCategoriesSuccess(state, action);
    case Types.GET_CATEGORIES_FAILURE:
      return getCategoriesFailure(state, action);
    case Types.ADD_CATEGORY_REQUEST:
      return addCategoryRequest(state, action);
    case Types.ADD_CATEGORY_SUCCESS:
      return addCategorySuccess(state, action);
    case Types.ADD_CATEGORY_FAILURE:
      return addCategoryFailure(state, action);
    default:
      return state;
  }
}
