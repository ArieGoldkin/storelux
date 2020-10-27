import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    borderRadius: "4px 4px 0 0",
    // height: 0,
    // paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  itemSize: {
    flexGrow: 0,
    width: "20rem",
    [theme.breakpoints.down(1200)]: {
      width: "16rem",
    },
    [theme.breakpoints.down("md")]: {
      width: "17rem",
    },
  },
  imageWrapper: {
    width: "100%",
    borderRadius: "4px 4px 0 0",
  },
  textContent: {
    color: "#1d1d1d",
  },
  productTitle: {
    display: "flex",
    justifyContent: "space-between",
  },
  centerSpinner: {
    textAlign: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    alignItems: "center",
    display: "flex",
  },
}));
