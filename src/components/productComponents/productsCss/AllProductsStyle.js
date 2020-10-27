import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "80%",
    margin: "0 auto",
    "& > *": {
      margin: "1rem",
    },
    [theme.breakpoints.down(1650)]: {
      width: "90%",
    },
    [theme.breakpoints.down(1200)]: {
      width: "100%",
    },

    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  contentWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  searchBar: {
    width: "30%",
  },
  searchWrapper: {
    width: "87%",
    display: "flex",
    justifyContent: "space-between",
    margin: "0 0 1rem",
    backgroundColor: "#fff",
    borderRadius: "4px",
    padding: "0.5rem",
  },
  spinnerPosition: {
    textAlign: "center",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  getAllBtn: {
    margin: "0 0 0 0",
  },
}));
