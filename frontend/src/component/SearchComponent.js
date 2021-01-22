import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

function SearchComponent() {
  const history = useHistory();

  const [Query, setQuery] = useState("");

  const onSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") onSearchClick();
  };

  const onSearchClick = useCallback(() => {
    history.push(`/search/${Query}`);
  }, [Query]);

  return (
    <div>
      <input
        type='text'
        name='search'
        onChange={onSearchChange}
        onKeyPress={onKeyPress}
      />
      <button type='button' onClick={onSearchClick}>
        search
      </button>
    </div>
  );
}

export default SearchComponent;
