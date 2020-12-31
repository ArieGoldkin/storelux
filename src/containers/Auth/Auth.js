import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import Input from "../../components/common/FormElements/Input";
import Button from "../../components/common/FormElements/Button";
import Card from "../../components/common/UIElements/Card";
import ErrorModal from "../../components/common/UIElements/ErrorModal";
import LoadingSpinner from "../../components/common/UIElements/LoadingSpinner";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  PASSWORD_VALIDATE,
} from "../../components/common/util/InputValidators";
import { useForm } from "../../hooks/form-hook";

import { getAuthError, getAuthLoading } from "../../store/selectors";
import {
  Authenticate,
  LoginAuth,
  clearErrorMessage,
} from "../../store/actions";

import "./Auth.css";

const Auth = ({ onAuth, onLogin, loading, error, onClearMessage }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const history = useHistory();

  let moveToTop = useRef();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          firstName: undefined,
          lastName: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          firstName: {
            value: "",
            isValid: false,
          },
          lastName: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    const pageNumber = 1;
    if (isLoginMode) {
      onLogin(formState.inputs.email.value, formState.inputs.password.value);
      history.push(`/products/page/${pageNumber}`);
    } else {
      onAuth(
        formState.inputs.firstName.value,
        formState.inputs.lastName.value,
        formState.inputs.email.value,
        formState.inputs.password.value
      );
      history.push(`/products/page/${pageNumber}`);
    }
  };

  const clearError = () => {
    onClearMessage();
  };

  if (moveToTop.current) {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }

  let errorMessage = null;
  if (error) {
    errorMessage = error.error;
  }

  let form = (
    <>
      <h2>{isLoginMode ? "Login" : "Sign Up"} Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler} ref={moveToTop}>
        {!isLoginMode && (
          <>
            <Input
              element="input"
              type="text"
              id="firstName"
              label="First Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your first name."
              onInput={inputHandler}
            />
            <Input
              element="input"
              type="text"
              id="lastName"
              label="Last Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your Last name."
              onInput={inputHandler}
            />
          </>
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password, at least 6 characters."
          onInput={inputHandler}
        />
        {!isLoginMode && (
          <Input
            element="input"
            id="passwordConfirm"
            type="password"
            label="Retype Password"
            validators={[PASSWORD_VALIDATE(formState.inputs.password.value)]}
            errorText="Please retype the provided password."
            onInput={inputHandler}
          />
        )}
        {isLoginMode && (
          <div className="resetPassword">
            <Link className="resetPassword_link" to="/RecoveryEmail">
              Forgot Password?
            </Link>
          </div>
        )}
        <Button
          type="submit"
          disabled={!formState.isValid}
          buttonClass="btnStyle"
        >
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler} buttonClass="btnStyle">
        SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
      </Button>
    </>
  );

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      <div className="auth__box">
        <Card className="authentication">
          {loading && <LoadingSpinner asOverlay />}
          {form}
        </Card>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: getAuthLoading(state),
    error: getAuthError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (firstName, lastName, email, password) =>
      dispatch(Authenticate(firstName, lastName, email, password)),
    onLogin: (email, password) => dispatch(LoginAuth(email, password)),
    onClearMessage: () => dispatch(clearErrorMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
