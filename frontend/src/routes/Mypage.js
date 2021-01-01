import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_API } from "../_actions/config";
import Post from "../component/Post";
import { useSelector } from "react-redux";

function Mypage() {
  const [Posts, setPosts] = useState([]);
  // const userid = useSelector((state) => state.user.userData._id);
  const userid = "gg";

  useEffect(() => {
    axios.get(`${SERVER_API}/api/users/${userid}`).then((res) => {
      console.log(res.data.posts);
      setPosts(res.data.posts);
    });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "80vw", display: "flex", justifyContent: "center" }}>
        {Posts.map((post) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Post post={post} key={post._id}/>
            <Post post={post} key={2}/>
            <Post post={post} key={3}/>
            <Post post={post} key={4}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mypage;
