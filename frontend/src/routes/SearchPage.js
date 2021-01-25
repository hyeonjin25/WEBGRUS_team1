import Axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { SERVER_API } from "../_actions/config";
import queryString from "query-string";
import Post from "../component/Post";

function SearchPage() {
  const location = useLocation();
  const query = queryString.parse(location.search);

  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    Axios.get(`${SERVER_API}/api/posts/search/${query.q}?mode=${query.mode}`)
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location]);

  const QueryResults = useMemo(
    () =>
      function Results() {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: "80%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
              }}
            >
              {Posts.map((post) => (
                <Post
                  key={post._id}
                  postid={post._id}
                  owner={post.owner}
                  title={post.title}
                  description={post.description}
                  files={post.files}
                  tags={post.tags}
                  posttime={post.posttime}
                  likecnt={post.likecnt}
                  viewcnt={post.viewcnt}
                  commentcnt={post.commentcnt}
                />
              ))}
            </div>
          </div>
        );
      },
    [query]
  );
  if (Posts.length === 0) {
    return (
      <div style={{ height: "100vh" }}>
        "{query.q}"의 검색결과가 없습니다...
      </div>
    );
  } else {
    return <>{QueryResults()}</>;
  }
}

export default SearchPage;
