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
  searchBarWrapper: {
    display: "flex",
    justifyContent: "space-between",
    width: "50%",
    [theme.breakpoints.down(768)]: {
      width: "100%",
      marginBottom: "0.5rem",
    },
  },
  searchBar: {
    width: "70%",
    display: "flex",
    [theme.breakpoints.down(500)]: {
      width: "65%",
    },
  },
  searchWrapper: {
    width: "87%",
    display: "flex",
    justifyContent: "space-between",
    margin: "0 0 1rem",
    backgroundColor: "#fff",
    borderRadius: "4px",
    padding: "0.5rem",
    [theme.breakpoints.down(1650)]: {
      width: "100%",
      alignItems: "center",
    },
    [theme.breakpoints.down(768)]: {
      flexDirection: "column",
    },
    [theme.breakpoints.down(500)]: {
      fontSize: "0.8rem",
    },
  },
  spinnerPosition: {
    textAlign: "center",
    width: "100%",
    height: "51vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  getAllBtn: {
    margin: "0 0 0 0",
    padding: "0.8rem",
    [theme.breakpoints.down(768)]: {
      width: "25%",
      padding: "0.8rem 0 0.8rem 0",
    },
    [theme.breakpoints.down(500)]: {
      width: "30%",
    },
  },
}));
