import React, { useEffect, useState } from "react";
import Post from "../component/Post";
import { connect } from "react-redux";
import { getUserposts } from "../_actions/postAction";

function Mypage(props) {
  const [Posts, setPosts] = useState([]);
  const auth = props.auth;

  useEffect(() => {
    //auth action에서 userData를 가져올 때 까지 기다리기
    if (auth.status.auth === "SUCCESS") {
      const userid = auth.userData.userid;
      props.getUserposts(userid).then((res) => {
        setPosts(res.payload);
      });
    }
  }, [auth.status.auth]);

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
        {Posts
          ? Posts.map((post) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
                key={post._id}
              >
                <Post post={post} key={post._id} />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getUserposts })(Mypage);
