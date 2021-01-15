import React, { useEffect, useState } from "react";
import Post from "../component/Post";
import { getAllpost } from "../_actions/postAction";
import { useDispatch } from "react-redux";

function Main() {
  const [Posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllpost()).then((res) => {
      setPosts(res.payload);
    });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "80vw", display: "flex", justifyContent: "center" }}>
        {Posts
          ? Posts.map((post) => (
              <div
                key={post._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <Post post={post} key={post._id} />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default Main;
