import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_API } from "../_actions/config";
import Post from "../component/Post";
import { useDispatch, useSelector } from "react-redux";
import { getMyposts } from "../_actions/postAction";

function Mypage() {
  const [Posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.user.userData.userid);
  useEffect(() => {
    dispatch(getMyposts(userid)).then((res) => {
      setPosts(res.payload.posts);
    });
  }, []);

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
  );
}

export default Mypage;
