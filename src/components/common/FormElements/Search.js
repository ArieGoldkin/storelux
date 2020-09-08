import React, { useRef, useEffect } from "react";

import "./Search.css";

const Search = ({ searchValue, setSearchValue }) => {
  const inputRef = useRef();


  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
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

export default Search;
