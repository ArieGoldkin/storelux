import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import Input from "../common/FormElements/Input";
import Button from "../common/FormElements/Button";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import ImageUpload from "../common/FormElements/ImageUpload";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MIN_NUMBER,
  VALIDATOR_SELECT,
} from "../common/util/InputValidators";
import { useForm } from "../hooks/form-hook";
import {
  getAuthUserId,
  getAuthToken,
} from "../userComponents/selectors/AuthSelectors";
import {
  getCategoriesLoading,
  getCategories,
  getCategoriesIsDone,
  getCategoriesError,
} from "../categoriesComponents/categoriesSelectors";
import {
  getNewProductLoading,
  getNewProductError,
  getNewProductRedirect,
} from "./selectors/NewProductSelectors";

import * as categoriesAction from "../categoriesComponents/categoriesActions";
import * as productsAction from "./productsActions/productsActions";
import "./productsCss/ProductForm.css";

const NewProduct = ({
  loadCategories,
  categories,
  loading,
  isDone,
  onCreate,
  categoryError,
  token,
  userId,
  newProductError,
  productLoading,
  canRedirect,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
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
    if (loading || productLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    if (categoryError) {
      setErrorMessage(categoryError);
    }
    if (newProductError) {
      debugger;
      setErrorMessage(newProductError);
    }
    if (canRedirect) {
      history.push(`/${userId}/products`);
    }
  }, [
    loadCategories,
    loading,
    isDone,
    categoryError,
    newProductError,
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
    setErrorMessage(null);
  };
  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && categories && (
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
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    userId: getAuthUserId(state),
    token: getAuthToken(state),
    loading: getCategoriesLoading(state),
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
    loadCategories: () => dispatch(categoriesAction.getCategoriesRequest()),
    onCreate: (token, formData) =>
      dispatch(productsAction.createProductRequest(token, formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);
