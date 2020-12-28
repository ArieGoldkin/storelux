import React from "react";
import { connect } from "react-redux";

import { getAuthLoading, getAuthError } from "../../../store/selectors";
import {
  ResetPasswordRequest,
  clearErrorMessage,
} from "../../../store/actions";

import Input from "../../../components/common/FormElements/Input";
import Button from "../../../components/common/FormElements/Button";
import LoadingSpinner from "../../../components/common/UIElements/LoadingSpinner";
import ErrorModal from "../../../components/common/UIElements/ErrorModal";
import Card from "../../../components/common/UIElements/Card";
import { useForm } from "../../../hooks/form-hook";
import { VALIDATOR_EMAIL } from "../../../components/common/util/InputValidators";

import "../Auth.css";

const RecoveryEmail = (props) => {
  const { resetPasswordRequest, loading, error, clearErrorMessage } = props;
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const resetSubmitHandler = (event) => {
    event.preventDefault();
    const email = formState.inputs.email.value.trim();
    resetPasswordRequest(email);
  };

  let errorMessage = null;
  if (error) {
    errorMessage = error.error;
  }

  const clearError = () => {
    clearErrorMessage();
  };

  let recoveryPasswordForm = (
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
  );

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {loading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!loading && (
        <div className="forgot_password">
          <Card className="authentication">
            <h2>Forgot your password?</h2>
            <div className="forgot_password_text">
              <p>Don't worry! just fill in your email and we'll send</p>
              <p>you a link to reset your password.</p>
            </div>
            {recoveryPasswordForm}
          </Card>
        </div>
      )}
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
    resetPasswordRequest: (email) => dispatch(ResetPasswordRequest(email)),
    clearErrorMessage: () => dispatch(clearErrorMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecoveryEmail);
