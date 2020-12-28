import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import {
  getCategoriesRequest,
  createProductRequest,
  clearAddProductFailure,
  clearCategoriesFailure,
} from "../../store/actions";

import {
  getAuthUserId,
  getAuthToken,
  getCategoriesLoading,
  getCategories,
  getCategoriesIsDone,
  getCategoriesError,
  getNewProductLoading,
  getNewProductError,
  getNewProductRedirect,
} from "../../store/selectors";

import Input from "../../components/common/FormElements/Input";
import Button from "../../components/common/FormElements/Button";
import ErrorModal from "../../components/common/UIElements/ErrorModal";
import LoadingSpinner from "../../components/common/UIElements/LoadingSpinner";
import ImageUpload from "../../components/common/FormElements/ImageUpload";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MIN_NUMBER,
  VALIDATOR_SELECT,
} from "../../components/common/util/InputValidators";
import { useForm } from "../../hooks/form-hook";

import "./AddProduct.css";

const AddProduct = ({
  loadCategories,
  categories,
  isDone,
  onCreate,
  categoryError,
  token,
  userId,
  newProductError,
  categoriesLoading,
  productLoading,
  canRedirect,
  clearProductFailure,
  clearCategoriesFailure,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      category: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      units: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    if (!isDone) {
      loadCategories();
    }
    if (categoriesLoading || productLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    if (canRedirect) {
      history.push(`/${userId}/products`);
    }
  }, [
    loadCategories,
    categoriesLoading,
    isDone,
    productLoading,
    canRedirect,
    history,
    userId,
  ]);

  const productSubmitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", formState.inputs.title.value.trim());
    formData.append("category", formState.inputs.category.value);
    formData.append("price", formState.inputs.price.value);
    formData.append("units", formState.inputs.units.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("image", formState.inputs.image.value);

    onCreate(token, formData);
  };

  const clearError = () => {
    if (categoryError) {
      clearCategoriesFailure();
    } else if (newProductError) {
      clearProductFailure();
    }
  };

  let errorMessage = null;

  if (categoryError) {
    errorMessage = categoryError;
  } else if (newProductError) {
    errorMessage = newProductError;
  }

  const productForm = (
    <form className="product-form" onSubmit={productSubmitHandler}>
      <h2>Add New Product</h2>
      <Input
        id="title"
        type="text"
        element="input"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="category"
        element="select"
        label="Category"
        type="select"
        value="Select Category"
        options={categories}
        validators={[VALIDATOR_SELECT("Select Category")]}
        errorText="Please enter a valid Category."
        onInput={inputHandler}
      />
      <Input
        id="price"
        type="number"
        element="input"
        label="Price"
        validators={[VALIDATOR_MIN_NUMBER()]}
        errorText="Please enter a valid price number above zero."
        onInput={inputHandler}
      />
      <Input
        id="units"
        type="number"
        element="input"
        label="Units"
        validators={[VALIDATOR_MIN_NUMBER()]}
        errorText="Please enter a valid number for units above zero."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <ImageUpload
        id="image"
        classImage="imagePreview"
        onInput={inputHandler}
        errorText="Please provide an image."
      />
      <Button
        type="submit"
        buttonClass="btnProductSubmit"
        disabled={!formState.isValid}
      >
        ADD PRODUCT
      </Button>
    </form>
  );

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && categories && productForm}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    userId: getAuthUserId(state),
    token: getAuthToken(state),
    categoriesLoading: getCategoriesLoading(state),
    productLoading: getNewProductLoading(state),
    categories: getCategories(state),
    isDone: getCategoriesIsDone(state),
    categoryError: getCategoriesError(state),
    newProductError: getNewProductError(state),
    canRedirect: getNewProductRedirect(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: () => dispatch(getCategoriesRequest()),
    onCreate: (token, formData) =>
      dispatch(createProductRequest(token, formData)),
    clearProductFailure: () => dispatch(clearAddProductFailure()),
    clearCategoriesFailure: () => dispatch(clearCategoriesFailure()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
