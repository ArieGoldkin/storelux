import "date-fns";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyle = makeStyles((theme) => ({
  pickerWrapper: {
    display: "flex",
    width: "50%",
    justifyContent: "space-between",
  },
}));

const DatePicker = ({
  fromSelectedDate,
  setFromSelectedDate,
  ToSelectedDate,
  setToSelectedDate,
}) => {
  const classes = useStyle();

  const FromHandleDateChange = (date) => {
    setFromSelectedDate(date);
  };
  const ToHandleDateChange = (date) => {
    setToSelectedDate(date);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid className={classes.pickerWrapper}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          margin="normal"
          label="To"
          value={ToSelectedDate}
          maxDateMessage
          minDate={fromSelectedDate}
          maxDate={new Date()}
          onChange={(date) => ToHandleDateChange(date)}
          format="dd/MM/yyyy"
          autoOk={true}
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          margin="normal"
          label="From"
          value={fromSelectedDate}
          onChange={(date) => FromHandleDateChange(date)}
          maxDate={ToSelectedDate}
          format="dd/MM/yyyy"
          autoOk={true}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
