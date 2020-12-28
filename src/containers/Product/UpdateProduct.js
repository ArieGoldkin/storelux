import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import {
  getCategoriesRequest,
  updateProductRequest,
  clearUpdateProductFailure,
  clearCategoriesFailure,
} from "../../store/actions";
import {
  getAuthToken,
  getAuthUserId,
  getUpdateProduct,
  getUpdateProductLoading,
  getUpdateProductError,
  getCategories,
  getCategoriesIsDone,
  getCategoriesError,
  getUpdateProductRedirect,
} from "../../store/selectors";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN_NUMBER,
  VALIDATOR_MINLENGTH,
  VALIDATOR_SELECT,
} from "../../components/common/util/InputValidators";
import Input from "../../components/common/FormElements/Input";
import Button from "../../components/common/FormElements/Button";
import Card from "../../components/common/UIElements/Card";
import ErrorModal from "../../components/common/UIElements/ErrorModal";
import LoadingSpinner from "../../components/common/UIElements/LoadingSpinner";
import ImageUpload from "../../components/common/FormElements/ImageUpload";
import { useForm } from "../../hooks/form-hook";
import "./AddProduct.css";

const UpdateProduct = ({
  loadCategories,
  categories,
  isDone,
  token,
  userId,
  onUpdate,
  product,
  productLoading,
  updateError,
  clearUpdateErrorMessage,
  categoriesError,
  clearCategoriesError,
  redirectUpdate,
}) => {
  const [isLoading, setIsLoading] = useState(true);
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
    if (redirectUpdate) {
      history.push(`/${userId}/products`);
    }
  }, [redirectUpdate, productLoading, userId, history]);

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
  }, [product, setFormData]);

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
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  let errorMessage = null;

  if (updateError) {
    errorMessage = updateError;
  } else if (categoriesError) {
    errorMessage = categoriesError;
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

  const clearError = () => {
    if (updateError) {
      clearUpdateErrorMessage();
    } else if (categoriesError) {
      clearCategoriesError();
    }
  };

  const updateForm = (
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
  );

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {!isLoading && product && updateForm}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: getCategories(state),
    categoriesError: getCategoriesError(state),
    isDone: getCategoriesIsDone(state),
    token: getAuthToken(state),
    userId: getAuthUserId(state),
    product: getUpdateProduct(state),
    productLoading: getUpdateProductLoading(state),
    updateError: getUpdateProductError(state),
    redirectUpdate: getUpdateProductRedirect(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: () => dispatch(getCategoriesRequest()),
    onUpdate: (token, productId, formData) =>
      dispatch(updateProductRequest(token, productId, formData)),
    clearUpdateErrorMessage: () => dispatch(clearUpdateProductFailure()),
    clearCategoriesError: () => dispatch(clearCategoriesFailure()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);
