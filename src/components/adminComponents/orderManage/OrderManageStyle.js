import { makeStyles } from "@material-ui/core/styles";

export const useStyle = makeStyles((theme) => ({
  tableWrapper: {
    width: "60%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: "1rem",
    padding: 0,
  },
  tablePadding: {
    width: "100%",
  },
  container: {
    maxHeight: "45rem",
  },

  datePickerWrapper: {
    display: "flex",
  },
  datePickerHeader: {
    padding: "2rem 1rem 0 1rem",
    fontSize: "1.2rem",
    margin: 0,
  },
}));
