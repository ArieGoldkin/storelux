import React, { useState } from "react";
import { connect } from "react-redux";

import { userSeenMessageRequest } from "../../../store/actions";

import { getAuthToken, getAuthUserId } from "../../../store/selectors";

import InboxMessageItem from "./InboxMessageItem";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Card from "../../common/UIElements/Card";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  accordionHeight: {
    minHeight: "55px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  btnWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "1rem",
  },
  infoStyle: {
    flexDirection: "column",
  },
}));

const InboxMessageList = ({ items, token, userId, messageSeen }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (index, messageId, item) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : false);
    if (item.active && isExpanded) {
      messageSeen({ token, userId, messageId });
    }
  };

  if (items.length === 0) {
    return (
      <Card>
        <h4>Inbox is empty</h4>
      </Card>
    );
  }

  return (
    <div className={classes.root}>
      {items.map((item, index) => (
        <Accordion
          key={item.id}
          id={item.id}
          expanded={expanded === index}
          onChange={handleChange(index, item.id, item)}
        >
          <AccordionSummary
            className={classes.accordionHeight}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>
              {item.systemNote}
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {item.title}
            </Typography>
          </AccordionSummary>
          <InboxMessageItem
            index={index}
            id={item.id}
            productId={item.productId}
            content={item.content}
            infoStyle={classes.infoStyle}
            btnWrapper={classes.btnWrapper}
            button={classes.button}
          />
        </Accordion>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: getAuthToken(state),
    userId: getAuthUserId(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    messageSeen: ({ token, userId, messageId }) =>
      dispatch(userSeenMessageRequest({ token, userId, messageId })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InboxMessageList);
