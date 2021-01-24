import React, { useEffect, useState } from "react";
import Post from "../component/Post";
import { connect } from "react-redux";
import { getUserposts } from "../_actions/postAction";
import Loading from "../component/Loading";

function Mypage(props) {
  const [Posts, setPosts] = useState([]);
  const auth = props.auth;

  console.log("mypage is load");

  useEffect(() => {
    //auth action에서 userData를 가져올 때 까지 기다리기
    if (auth.status.auth === "SUCCESS" && auth.isAuth) {
      const userid = auth.userData.userid;
      props.getUserposts(userid).then((res) => {
        setPosts(res.payload);
      });
    }
  }, [auth.status.auth]);

  if (auth.status.auth === "SUCCESS") {
    return (
      <>
        <div>{auth.userData.userid}님의 게시물 입니다</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "80%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}
          >
            {Posts ? (
              Posts.map((post) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                  key={post._id}
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
                </div>
              ))
            ) : (
              <div>게시물이 없습니다</div>
            )}
          </div>
        </div>
    </>
    );
  } else {
    return <Loading/>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getUserposts })(Mypage);
