import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, Redirect } from "react-router-dom";

import {
  passwordUpdateRequest,
  clearErrorMessage,
  setAuthRedirectPath,
} from "../../../store/actions";
import {
  getAuthLoading,
  getAuthError,
  getCanRedirect,
  getRedirectPath,
} from "../../../store/selectors";

import ErrorModal from "../../../components/common/UIElements/ErrorModal";
import LoadingSpinner from "../../../components/common/UIElements/LoadingSpinner";
import Input from "../../../components/common/FormElements/Input";
import Button from "../../../components/common/FormElements/Button";
import Card from "../../../components/common/UIElements/Card";
import {
  VALIDATOR_MINLENGTH,
  PASSWORD_VALIDATE,
} from "../../../components/common/util/InputValidators";
import { useForm } from "../../../hooks/form-hook";

import "../Auth.css";

const ResetPasswordPage = ({
  loading,
  error,
  newPasswordUpdate,
  canRedirect,
  clearErrorMessage,
  onSetRedirectPath,
  path,
}) => {
  const resetToken = useParams().token;

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
    if (loading && path !== "/auth") {
      onSetRedirectPath();
    }
  }, [loading, onSetRedirectPath, path]);

  const newPasswordSubmitHandler = (event) => {
    event.preventDefault();
    const newPassword = formState.inputs.password.value;
    newPasswordUpdate({ resetToken, newPassword });
  };

  const clearError = () => {
    clearErrorMessage();
  };

  let errorMessage = null;
  if (error) {
    errorMessage = error.error;
  }

  let redirectToLogin = null;
  if (canRedirect && path !== "/") {
    redirectToLogin = <Redirect to={path} />;
  }

  let recoveryForm = (
    <form onSubmit={newPasswordSubmitHandler} className="form_content">
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
        validators={[PASSWORD_VALIDATE(formState.inputs.password.value)]}
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
  );

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {redirectToLogin}
      {loading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!loading && (
        <>
          <div className="forgot_password">
            <Card className="authentication">
              <h2>Reset password</h2>
              <div className="forgot_password_text">
                <p>Your final step to go back shopping!!</p>
              </div>
              {recoveryForm}
            </Card>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: getAuthLoading(state),
    error: getAuthError(state),
    canRedirect: getCanRedirect(state),
    path: getRedirectPath(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newPasswordUpdate: ({ resetToken, newPassword }) =>
      dispatch(passwordUpdateRequest({ resetToken, newPassword })),
    clearErrorMessage: () => dispatch(clearErrorMessage()),
    onSetRedirectPath: () => dispatch(setAuthRedirectPath("/auth")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
