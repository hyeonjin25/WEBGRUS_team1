import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";

import { getAllpost } from "../_actions/postAction";

import Post from "../component/Post";
import Loading from "../component/Loading";
import useInfinteScroll from "../hoc/infiniteScroll";
import styled from "styled-components";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const SortButton = styled.button`
  &:before {
    content: "|  ";
    color: #6e933e;
    font-weight: 900;
    position: relative;
    right: 3px;
  }
  &:first-child:before {
    content: "";
  }
`;

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

function Main(props) {
  const dispatch = useDispatch();
  const targetRef = useRef(null);

  const [sortMode, setSortMode] = useState("times");
  const [posts, setPosts] = useState([]);
  const [curPage, setCurPage] = useState(0);
  const [isLastPage, setLastPage] = useState(false);

  const changeSortMode = (sort) => {
    setLastPage(false);
    setSortMode(sort);
    dispatch(getAllpost(sort, 1)).then((res) => {
      setPosts(res.payload);
      setCurPage(1);
    });
  };

  useEffect(() => {
    setLastPage(false);
    dispatch(getAllpost("times", 1)).then((res) => {
      setPosts(res.payload);
      setCurPage(1);
    });
  }, []);

  useInfinteScroll({
    target: targetRef.current,
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting && !isLastPage) {
        dispatch(getAllpost(sortMode, curPage + 1)).then((res) => {
          if (res.payload.length > 0) {
            setPosts(posts.concat(res.payload));
            setCurPage(curPage + 1);
          } else setLastPage(true);
        });
      }
    },
  });

  //모든 포스트 가져오는 액션이 끝난 후 로드
  if (props.post.allpost) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* 정렬버튼 */}
        <div
          style={{
            width: "90%",
          }}
        >
          <div style={{ float: "right", fontSize: 16 }}>
            <SortButton
              type='button'
              name='times'
              onClick={() => {
                changeSortMode("times");
              }}
            >
              최신순
            </SortButton>
            <SortButton
              type='button'
              name='views'
              onClick={() => {
                changeSortMode("views");
              }}
            >
              조회순
            </SortButton>
            <SortButton
              type='button'
              name='likes'
              onClick={() => {
                changeSortMode("likes");
              }}
            >
              인기순
            </SortButton>
          </div>
        </div>

        <div style={{ marginTop: 30, padding: 5, width: "90%", minWidth: 500 }}>
          <MuiThemeProvider theme={theme}>
            <Grid container spacing={3}>
              {posts
                ? posts.map((post) => (
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
                          auth={props.auth.userData}
                        />
                      </Paper>
                    </Grid>
                  ))
                : ""}
            </Grid>
          </MuiThemeProvider>
        </div>
        <div ref={targetRef} />
      </div>
    );
  } else {
    return <Loading />;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps)(Main);
