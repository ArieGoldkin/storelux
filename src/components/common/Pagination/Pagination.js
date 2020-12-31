import React from "react";
import { NavLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import "./Pagination.css";

const useStyles = makeStyles({
  arrowStyle: {
    color: "#0582ca",
    transitionDuration: "0.4s",
    "&:hover": {
      color: "#fff",
    },
  },
});

const Pagination = (props) => {
  const {
    totalProducts,
    productsPerPage,
    paginate,
    nextPage,
    prevPage,
  } = props;

  const classes = useStyles();

  const pageNumber = [];
  for (
    let index = 1;
    index <= Math.ceil(totalProducts / productsPerPage);
    index++
  ) {
    pageNumber.push(index);
  }

  return (
    <nav className="page-bar-number">
      <ul className="pagination">
        <li className="page-item">
          <ChevronLeftIcon
            classes={{ root: classes.arrowStyle }}
            onClick={prevPage.bind(null, pageNumber[0])}
          />
        </li>
        {pageNumber.map((number) => (
          <li key={number}>
            <NavLink
              className="page-item"
              activeClassName="active-link"
              to={`/products/page/${number}`}
              onClick={paginate.bind(null, number)}
            >
              {number}
            </NavLink>
          </li>
        ))}
        <li className="page-item">
          <ChevronRightIcon
            classes={{ root: classes.arrowStyle }}
            onClick={nextPage.bind(null, pageNumber[pageNumber.length - 1])}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
