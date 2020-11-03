import React from "react";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    width: "80%",
    margin: "1rem auto",
  },
  drawerSize: {
    marginRight: "1rem",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  messageHeader: {
    margin: "0.5rem 0 1rem 1rem",
  },
}));

const InboxDrawer = ({ messages, setSidebarSection }) => {
  const classes = useStyles();
  return (
    <div className={classes.drawerSize}>
      <h2 className={classes.messageHeader}>Messages</h2>
      <Divider />
      <List>
        {["Inbox", "Starred", "Send message", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default InboxDrawer;
