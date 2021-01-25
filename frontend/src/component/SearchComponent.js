import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

function SearchComponent() {
  const history = useHistory();

  const [Query, setQuery] = useState("");
  const [Mode, setMode] = useState("title");

  const onQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const onModeChange = (e) => {
    setMode(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") onSearchClick();
  };

  const onSearchClick = () => {
    history.push(`/search?mode=${Mode}&q=${Query}`);
    setQuery("");
    setMode("title");
  };

  return (
    <div>
      <input
        type='text'
        name='search'
        value={Query}
        onChange={onQueryChange}
        onKeyPress={onKeyPress}
      />
      <select value={Mode} onChange={onModeChange}>
        <option value='title'>제목</option>
        <option value='content'>내용</option>
        <option value='all'>제목+내용</option>
        <option value='owner'>글 작성자</option>
        <option value='tags'>태그</option>
      </select>
      <button type='button' onClick={onSearchClick}>
        검색
      </button>
    </div>
  );
}

export default SearchComponent;
