import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import * as authSelectors from "../../userComponents/selectors/AuthSelectors";
import * as adminSelectors from "../../adminComponents/selectors/adminSelectors";
import * as adminActions from "../adminActions/adminActions";
import { makeStyles } from "@material-ui/core/styles";
import { VALIDATOR_REQUIRE } from "../../common/util/InputValidators";
import { useForm } from "../../hooks/form-hook";
import ErrorModal from "../../common/UIElements/ErrorModal";
import LoadingSpinner from "../../common/UIElements/LoadingSpinner";
import Card from "../../common/UIElements/Card";
import Input from "../../common/FormElements/Input";
import Button from "../../common/FormElements/Button";

const useStyles = makeStyles({
  cardWrapper: {
    width: "40%",
    margin: "1rem auto",
  },
  btnVat: {
    marginTop: "1rem",
  },
});

const AdminRateChange = ({ adminId, token, vatRateChange, loading, error }) => {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formState, inputHandler] = useForm(
    {
      vat: {
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

  const onSubmitVatRate = (event) => {
    event.preventDefault();
    const rate = formState.inputs.vat.value;
    console.log(rate);
    vatRateChange({ rate, adminId, token });
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
        <Card className={classes.cardWrapper}>
          <h3>Change current vat rate</h3>
          <form onSubmit={onSubmitVatRate}>
            <Input
              id="vat"
              type="number"
              element="input"
              label="Vat rate"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid vat number."
              onInput={inputHandler}
            />
            <Button
              type="submit"
              buttonClass={classes.btnVat}
              disabled={!formState.isValid}
            >
              CHANGE VAT RATE
            </Button>
          </form>
        </Card>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    adminId: authSelectors.getAuthUserId(state),
    token: authSelectors.getAuthtoken(state),
    loading: adminSelectors.getloading(state),
    error: adminSelectors.getError(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    vatRateChange: ({ rate, adminId, token }) =>
      dispatch(adminActions.updateRateRequest({ rate, adminId, token })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminRateChange);
