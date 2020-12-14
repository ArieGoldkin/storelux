import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";

import { onChangeSearchInput } from "../../../store/actions";
import "./Search.css";

const Search = ({ searchValue, setSearchValue, onChangeInput, inputStyle }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    onChangeInput();
  };

  return (
    <div className={`search_input ${inputStyle}`}>
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
    onChangeInput: () => dispatch(onChangeSearchInput()),
  };
};

export default connect(null, mapDispatchToProps)(Search);
