import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";

function SearchComponent({ small }) {
  const history = useHistory();

  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("title");

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
    history.push(`/search?mode=${mode}&q=${query}`);
    setQuery("");
    setMode("title");
  };

  console.log(small);

  return (
    <div style={{ display: "flex", margin: 5 }}>
      <select
        value={mode}
        onChange={onModeChange}
        style={{
          width: small ? "15vw" : "9vw",
          height: 30,
          fontFamily: "noto",
          fontSize: small ? "2vw" : "1.3vw",
          fontWeight: 300,
          background: "#FFFFFF",
          border: "2px solid #FFFFFF",
        }}
      >
        <option value='title'>제목</option>
        <option value='content'>내용</option>
        <option value='all'>제목+내용</option>
        <option value='owner'>글 작성자</option>
        <option value='tags'>태그</option>
      </select>
      <input
        type='text'
        name='search'
        value={query}
        onChange={onQueryChange}
        onKeyPress={onKeyPress}
        style={{
          width: small ? "45vw" : "35vw",
          height: 24,
          backgroundColor: "#C4C4C4",
          border: "2px solid #FFFFFF",
          paddingLeft: 10,
          marginLeft: -2,
        }}
      />

      <SearchIcon
        style={{
          color: "white",
          width: 30,
          height: 30,
          marginLeft: 10,
          cursor:'pointer'
        }}
        alt='검색버튼'
        onClick={onSearchClick}
      />
    </div>
  );
}

export default SearchComponent;
