import React from "react";
import { connect } from "react-redux";

import { onChangeCategorySearch } from "../../../store/actions";

import { makeStyles } from "@material-ui/core/styles";
import { VALIDATOR_SELECT } from "../../common/util/InputValidators";
import Input from "./Input";
import Button from "./Button";
import { useForm } from "../../../hooks/form-hook";

const useStyles = makeStyles((theme) => ({
  inputWrapperSelect: {
    display: "flex",
    alignItems: "center",
    width: "38%",
    borderRadius: "4px",
    margin: "0 0 0 4rem",
  },
  formWrapper: {
    display: "flex",
    height: "100%",
  },
  inputStyle: {
    display: "flex",
    margin: 0,
    width: "100%",
    height: "100%",
    "&.form-box select": {
      borderColor: "#0582ca",
      backgroundColor: "#fff",
    },
  },
  categoryStyle: {
    margin: "0 1rem 0 0",
  },
  btn: {
    width: "17rem",
    margin: "0 0 0 2rem",
  },
  errorMessage: {
    margin: "0 0 0 1rem",
  },
}));

const SearchByCategory = ({ categories, setCategory, onChangeCategory }) => {
  const classes = useStyles();

  const [formState, inputHandler] = useForm(
    {
      category: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleChangeProduct = (event) => {
    event.preventDefault();
    const categorySearch = formState.inputs.category.value;
    setCategory(categorySearch);
    onChangeCategory();
  };

  return (
    <div className={classes.inputWrapperSelect}>
      {/* <h3 className={classes.categoryStyle}>Category</h3> */}
      <form onSubmit={handleChangeProduct} className={classes.formWrapper}>
        <Input
          classInput={classes.inputStyle}
          id="category"
          element="select"
          type="select"
          value="Select Category"
          options={categories}
          validators={[VALIDATOR_SELECT("Select Category")]}
          errorText="Please enter a valid Category."
          errorStyle={classes.errorMessage}
          onInput={inputHandler}
        />
        <Button type="submit" buttonClass={classes.btn}>
          Find by category
        </Button>
      </form>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    onChangeCategory: () => dispatch(onChangeCategorySearch()),
  };
};

export default connect(null, mapDispatchToProps)(SearchByCategory);
