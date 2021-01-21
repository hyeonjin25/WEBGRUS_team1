import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import SearchComponent from "../component/SearchComponent";

const SearchPage = () => {
  const query = useParams();

  const QueryResults = useMemo(
    () =>
      function Results() {
        console.log(query);
        return (
          <div>
            {/* 검색창 */}
            <SearchComponent />
          </div>
        );
      },
    [query]
  );

  return <>{QueryResults()}</>;
};

export default SearchPage;
