import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";

import * as productActions from "../../productComponents/productsActions/productsActions";
import "./Search.css";

const Search = ({ searchValue, setSearchValue, onChangeInput }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    onChangeInput();
  };

  return (
    <div className="search_input">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search Product Name..."
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeInput: () => dispatch(productActions.onChangeSearchInput()),
  };
};

export default connect(null, mapDispatchToProps)(Search);
