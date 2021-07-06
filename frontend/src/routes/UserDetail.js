import React, { useState, useEffect, useRef } from "react";
import Post from "../component/Post";
import { useDispatch } from "react-redux";
import { getUserposts } from "../_actions/postAction";
import { useParams } from "react-router-dom";

import FollowComponent from "../component/FollowComponent";
import useInfinteScroll from "../hoc/infiniteScroll";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import "./UserDetail.scss";

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

function UserDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const targetRef = useRef(null);

  const userid = params.userid;

  const [posts, setPosts] = useState([]);
  const [postsNum, myPostsNum] = useState();
  const [curPage, setCurPage] = useState(0);
  const [isLastPage, setLastPage] = useState(false);

  useEffect(() => {
    setLastPage(false);
    dispatch(getUserposts({ userid, page: 1 })).then((res) => {
      setPosts(res.payload);
      setCurPage(1);
    });
  }, []);

  useInfinteScroll({
    target: targetRef.current,
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting && !isLastPage) {
        dispatch(getUserposts({ userid, page: curPage + 1 })).then((res) => {
          if (res.payload.length > 0) {
            setPosts(posts.concat(res.payload));
            setCurPage(curPage + 1);
          } else setLastPage(true);
        });
      }
    },
  });

  return (
    <div className="userdetail-container">
      <div className='top-menu'>
        <h2>{userid}</h2>
        <div className='follow'>
          <FollowComponent userid={userid} />
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
                      margin: '0 auto'
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
              ))
              : ""}
          </Grid>
        </MuiThemeProvider>
      </div>
      <div ref={targetRef} />
    </div>
  );
}

export default UserDetail;
