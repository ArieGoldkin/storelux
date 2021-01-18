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
    width: "40%",
    [theme.breakpoints.down(768)]: {
      width: "100%",
      display: "block",
    },
  },
  formWrapper: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    [theme.breakpoints.down(768)]: {
      justifyContent: "space-between",
    },
  },
  inputStyle: {
    display: "flex",
    margin: 0,
    width: "100%",
    "&.form-box select": {
      borderColor: "#0582ca",
      backgroundColor: "#fff",
      padding: "0.7rem",
    },
    [theme.breakpoints.down(768)]: {
      width: "70%",
    },
    [theme.breakpoints.down(500)]: {
      width: "65%",
    },
  },
  categoryStyle: {
    margin: "0 1rem 0 0",
  },
  btn: {
    width: "17rem",
    margin: "0 0 0 2rem",
    padding: "0.8rem",
    [theme.breakpoints.down(768)]: {
      width: "25%",
      margin: 0,
      padding: "0.8rem 0 0.8rem 0",
    },
    [theme.breakpoints.down(500)]: {
      width: "30%",
    },
  },
  errorMessage: {
    margin: "0 0 0 1rem",
    position: "relative",
    fontSize: "0.8rem",
    textAlign: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
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
      <form onSubmit={handleChangeProduct} className={classes.formWrapper}>
        <Input
          classInput={classes.inputStyle}
          id="category"
          element="select"
          type="select"
          value="Select Category"
          options={categories}
          validators={[VALIDATOR_SELECT("Select Category")]}
          errorText="Please select a valid Category."
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
