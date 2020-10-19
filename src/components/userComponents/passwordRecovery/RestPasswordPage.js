import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, Redirect } from "react-router-dom";

import * as actions from "../usersActions/ResetUserPasswordActions";
import * as authSelectors from "../selectors/AuthSelectors";
import ErrorModal from "../../common/UIElements/ErrorModal";
import LoadingSpinner from "../../common/UIElements/LoadingSpinner";
import Input from "../../common/FormElements/Input";
import Button from "../../common/FormElements/Button";
import Card from "../../common/UIElements/Card";
import {
  VALIDATOR_MINLENGTH,
  PASSWORD_VALIDATE,
} from "../../common/util/InputValidators";
import { useForm } from "../../hooks/form-hook";

import "../usersCss/Auth.css";

const ResetPasswordPage = ({
  loading,
  error,
  newPasswordUpdate,
  canRedirect,
}) => {
  const resetToken = useParams().token;

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formState, inputHandler] = useForm(
    {
      password: {
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

  const newPasswordSubmitHandler = (event) => {
    event.preventDefault();
    const newPassword = formState.inputs.password.value;
    newPasswordUpdate({ resetToken, newPassword });
  };

  const clearError = () => {
    setErrorMessage(null);
  };

  let redirectToLogin = null;
  if (canRedirect) {
    redirectToLogin = <Redirect to="/auth" />;
  }
  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <>
          {redirectToLogin}
          <div className="forgot_password">
            <Card className="authentication">
              <h2>Reset password</h2>
              <div className="forgot_password_text">
                <p>Your final step to go back shopping!!</p>
              </div>
              <form
                onSubmit={newPasswordSubmitHandler}
                className="form_content"
              >
                <Input
                  element="input"
                  id="password"
                  type="password"
                  label="Password"
                  validators={[VALIDATOR_MINLENGTH(6)]}
                  errorText="Please enter a valid password, at least 6 characters."
                  onInput={inputHandler}
                />
                <Input
                  element="input"
                  id="passwordConfirm"
                  type="password"
                  label="Retype Password"
                  validators={[
                    PASSWORD_VALIDATE(formState.inputs.password.value),
                  ]}
                  errorText="Please retype the provided password."
                  onInput={inputHandler}
                />
                <Button
                  type="submit"
                  disabled={!formState.isValid}
                  buttonClass="btnStyle"
                >
                  Update Password
                </Button>
              </form>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: authSelectors.getAuthLoading(state),
    error: authSelectors.getAuthError(state),
    canRedirect: authSelectors.getCanRedirect(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newPasswordUpdate: ({ resetToken, newPassword }) =>
      dispatch(actions.passwordUpdateRequest({ resetToken, newPassword })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
