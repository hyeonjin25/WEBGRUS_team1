import React, { useState, useEffect } from "react";
import Post from "../component/Post";
import { useDispatch } from "react-redux";
import { getUserposts } from "../_actions/postAction";
import { useParams } from "react-router-dom";

import FollowComponent from "../component/FollowComponent";

function UserDetail() {
  const params = useParams();
  const userid = params.userid;
  const [Posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserposts(userid)).then((res) => {
      setPosts(res.payload.posts);
    });
  }, []);
  return (
    <div>
      <div style={{ marginLeft: "150px" }}>
        <h2>{userid}</h2>
        <FollowComponent />
      </div>
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Post post={post} key={post.postid} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
