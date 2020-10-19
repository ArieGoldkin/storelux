import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import * as authSelectors from "../selectors/AuthSelectors";
import * as actions from "../usersActions/ResetUserPasswordActions";
import Input from "../../common/FormElements/Input";
import Button from "../../common/FormElements/Button";
import LoadingSpinner from "../../common/UIElements/LoadingSpinner";
import ErrorModal from "../../common/UIElements/ErrorModal";
import Card from "../../common/UIElements/Card";
import { useForm } from "../../hooks/form-hook";
import { VALIDATOR_EMAIL } from "../../common/util/InputValidators";

import "../usersCss/Auth.css";

const ResetPassword = ({ resetPasswordRequest, loading, error }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    loading === true ? setIsLoading(true) : setIsLoading(false);
    error && setErrorMessage(error.error);
  }, [error, loading]);

  const resetSubmitHandler = (event) => {
    event.preventDefault();
    const email = formState.inputs.email.value.trim();
    resetPasswordRequest(email);
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
        <div className="forgot_password">
          <Card className="authentication">
            <h2>Forgot your password?</h2>
            <div className="forgot_password_text">
              <p>Don't worry! just fill in your email and we'll send</p>
              <p>you a link to reset your password.</p>
            </div>
            <form onSubmit={resetSubmitHandler} className="form_content">
              <Input
                element="input"
                id="email"
                type="email"
                label="E-Mail"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email address."
                onInput={inputHandler}
              />
              <Button
                type="submit"
                disabled={!formState.isValid}
                buttonClass="btnStyle"
              >
                Reset Password
              </Button>
            </form>
          </Card>
        </div>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: authSelectors.getAuthLoading(state),
    error: authSelectors.getAuthError(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    resetPasswordRequest: (email) =>
      dispatch(actions.ResetPasswordRequest(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
