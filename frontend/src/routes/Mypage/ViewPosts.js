import React from "react";
import Post from "../../component/Post";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import "./ViewPosts.scss";

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

function ViewPosts({ posts, userid, menu }) {
  const ViewMyPosts = (
    <>
      {/* 내가 올린 게시물이 있을 경우 */}
      {posts ? (
        posts.map((post) => (
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
        ))
      ) : (
        <></>
      )}
    </>
  );

  /*
  const Message = () => {
    if (menu === "myposts") {
      return <div>{userid}님의 게시물 입니다</div>;
    } else if (menu === "favoriteposts") {
      return <div>{userid}님이 좋아한 게시물 입니다</div>;
    }
  };
  */

  return (
    <>
      <div className='mypage-posts'>
        <MuiThemeProvider theme={theme}>
          <Grid container spacing={3}>
            {ViewMyPosts}
          </Grid>
        </MuiThemeProvider>
        {posts ? (
          <></>
        ) : (
          <div className='empty'>[게시글이 존재하지 않습니다.]</div>
        )}
      </div>
    </>
  );
}

export default ViewPosts;
