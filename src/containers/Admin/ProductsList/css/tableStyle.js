import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  tableHead: {
    fontWeight: "bold",
    fontSize: "1.7vh",
  },
  tableWrapper: {
    width: "60%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-around",
    marginTop: "1rem",
  },
  tableHeight: {
    height: "40rem",
  },
  checkBox: {
    color: "#1976D2",
  },
}));