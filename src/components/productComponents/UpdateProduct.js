import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN_NUMBER,
  VALIDATOR_MINLENGTH,
  VALIDATOR_SELECT,
} from "../common/util/InputValidators";
import Input from "../common/FormElements/Input";
import Button from "../common/FormElements/Button";
import Card from "../common/UIElements/Card";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import ImageUpload from "../common/FormElements/ImageUpload";
import { useForm } from "../hooks/form-hook";

// IMPORTING SELECTORS
import {
  getAuthToken,
  getAuthUserId,
} from "../userComponents/selectors/AuthSelectors";
import {
  getUpdateProduct,
  getUpdateProductLoading,
  getUpdateProductError,
} from "./selectors/UpdateProductSelector";
import {
  getCategories,
  getCategoriesIsDone,
} from "../categoriesComponents/categoriesSelectors";

// IMPORTING ACTIONS
import { getCategoriesRequest } from "../categoriesComponents/categoriesActions";
import {
  updateProductRequest,
} from "./productsActions/productsActions";

import "./productsCss/ProductForm.css";

const UpdateProduct = ({
  loadCategories,
  categories,
  isDone,
  token,
  userId,
  getProduct,
  onUpdate,
  product,
  productLoading,
  error,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [formState, inputHandler, setFormData] = useForm();

  const productId = useParams().productId;
  const history = useHistory();

  let moveToTop = useRef();

  useEffect(() => {
    if (!isDone) {
      loadCategories();
    }
  }, [isDone, loadCategories]);

  useEffect(() => {
    if (productLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    if (error) {
      setErrorMessage(error);
    }
  }, [error, getProduct, productId, productLoading]);

  useEffect(() => {
    setFormData(
      {
        title: {
          value: product.title,
          isValid: true,
        },
        category: {
          value: product.category,
          isValid: true,
        },
        price: {
          value: product.price,
          isValid: true,
        },
        units: {
          value: product.units,
          isValid: true,
        },
        description: {
          value: product.description,
          isValid: true,
        },
        image: {
          value: product.image,
          isValid: true,
        },
      },
      true
    );
    if (moveToTop.current) {
      window.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    }
  }, [error, product, productLoading, setFormData]);

  const clearError = () => {
    setErrorMessage(null);
  };

  const updateSubmitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("category", formState.inputs.category.value);
    formData.append("price", formState.inputs.price.value);
    formData.append("units", formState.inputs.units.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("image", formState.inputs.image.value);

    onUpdate(token, productId, formData);
    if (!productLoading) {
      history.push(`/${userId}/products`);
    }
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product && !errorMessage) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find product!</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {!isLoading && product && (
        <form
          className="product-form"
          onSubmit={updateSubmitHandler}
          ref={moveToTop}
        >
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={product.title}
            initialValid={true}
          />
          <Input
            id="category"
            element="select"
            label="Category"
            type="select"
            value={product.category}
            options={categories}
            validators={[VALIDATOR_SELECT("Select Category")]}
            errorText="Please enter a valid Category."
            onInput={inputHandler}
            initialValue={product.category}
            initialValid={true}
          />
          <Input
            id="price"
            element="input"
            type="number"
            label="Price"
            validators={[VALIDATOR_MIN_NUMBER()]}
            errorText="Please enter a valid price number above zero."
            onInput={inputHandler}
            initialValue={product.price}
            initialValid={true}
          />
          <Input
            id="units"
            element="input"
            type="number"
            label="Units"
            validators={[VALIDATOR_MIN_NUMBER()]}
            errorText="Please enter a valid price number above zero."
            onInput={inputHandler}
            initialValue={product.units}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
            initialValue={product.description}
            initialValid={true}
          />
          <ImageUpload
            id="image"
            classImage="imagePreview"
            onInput={inputHandler}
            initialValue={product.image}
            initialValid={true}
          />
          <Button
            type="submit"
            buttonClass="btnProductSubmit"
            disabled={!formState.isValid}
          >
            UPDATE PRODUCT
          </Button>
        </form>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: getCategories(state),
    isDone: getCategoriesIsDone(state),
    token: getAuthToken(state),
    userId: getAuthUserId(state),
    product: getUpdateProduct(state),
    productLoading: getUpdateProductLoading(state),
    error: getUpdateProductError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: () => dispatch(getCategoriesRequest()),
    onUpdate: (token, productId, formData) =>
      dispatch(updateProductRequest(token, productId, formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);
