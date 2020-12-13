import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Card from "../../common/UIElements/Card";
import Input from "../../common/FormElements/Input";
import Button from "../../common/FormElements/Button";
import LoadingSpinner from "../../common/UIElements/LoadingSpinner";
import ErrorModal from "../../common/UIElements/ErrorModal";
import { useForm } from "../../hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../common/util/InputValidators";
import {
  getCategoriesRequest,
  addCategoryRequest,
} from "../../categoriesComponents/categoriesActions";
import {
  getAuthUserId,
  getAuthToken,
} from "../../userComponents/selectors/AuthSelectors";
import {
  getCategoriesIsDone,
  getCategoriesLoading,
  getCategoriesError,
} from "../../categoriesComponents/categoriesSelectors";
import "./AddCategory.css";

const AddCategory = ({
  adminId,
  token,
  onAddCategory,
  categoriesIsDone,
  loadCategories,
  loading,
  error,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formState, inputHandler] = useForm(
    {
      category: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    if (!categoriesIsDone) {
      loadCategories();
    }
    loading === true ? setIsLoading(true) : setIsLoading(false);
    error && setErrorMessage(error.error);
  }, [categoriesIsDone, loadCategories, loading, error]);

  const onSubmitCategory = (event) => {
    event.preventDefault();
    const category = formState.inputs.category.value.trim();
    onAddCategory(category, adminId, token);
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
      {!isLoading && (
        <Card className="addCategory_content">
          <h3>Add new Category</h3>
          <form onSubmit={onSubmitCategory}>
            <Input
              id="category"
              type="text"
              element="input"
              label="Category"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid title."
              onInput={inputHandler}
            />
            <Button
              type="submit"
              buttonClass="btnCategorySubmit"
              disabled={!formState.isValid}
            >
              ADD CATEGORY
            </Button>
          </form>
        </Card>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    adminId: getAuthUserId(state),
    token: getAuthToken(state),
    categoriesIsDone: getCategoriesIsDone(state),
    loading: getCategoriesLoading(state),
    error: getCategoriesError(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: () => dispatch(getCategoriesRequest()),
    onAddCategory: (category, userId, token) =>
      dispatch(addCategoryRequest(category, userId, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);
