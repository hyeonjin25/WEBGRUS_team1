import Axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { SERVER_API } from "../_actions/config";
import queryString from "query-string";
import Post from "../component/Post";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      sm: 300,
      md: 600,
      lg: 880,
      xl: 1165,
    },
  },
});

function SearchPage() {
  const location = useLocation();
  const query = queryString.parse(location.search);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Axios.get(`${SERVER_API}/api/posts/search/${query.q}?mode=${query.mode}`)
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => {
        setPosts(null);
      });
  }, [location]);

  const QueryResults = useMemo(
    () =>
      function Results() {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: "notoBold",
                fontWeight: 900,
                color: "white",
                textShadow:
                  "-1px 0 black, 1px 0 black, 0 1px black, 0 -1px black",
              }}
            >
              <span
                style={{
                  color: "#9CC567",
                }}
              >
                "{query.q}"
              </span>
              의 검색결과 입니다...
            </div>
            <div
              style={{
                width: "90%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                marginTop: 20,
              }}
            >
              {" "}
              <MuiThemeProvider theme={theme}>
                <Grid container spacing={3}>
                  {posts.map((post) => (
                    <Grid item xl={3} lg={4} md={6} sm={12}>
                      <Paper
                        spacing={3}
                        style={{
                          maxWidth: 300,
                          margin: "0 auto",
                        }}
                      >
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
                      </Paper>
                    </Grid>
                  ))}{" "}
                </Grid>
              </MuiThemeProvider>
            </div>
          </div>
        );
      },
    [query]
  );
  if (posts) {
    return <>{QueryResults()}</>;
  } else {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          fontFamily: "notoBold",
          fontWeight: 900,
          color: "white",
          textShadow: "-1px 0 black, 1px 0 black, 0 1px black, 0 -1px black",
        }}
      >
        <span
          style={{
            color: "#9CC567",
          }}
        >
          "{query.q}"
        </span>
        의 검색결과가 없습니다...
      </div>
    );
  }
}

export default SearchPage;
