import React, { useEffect, useState } from "react";
import Post from "../component/Post";
import { getAllpost } from "../_actions/postAction";
import { connect, useDispatch } from "react-redux";

function Main(props) {
  const [Posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllpost()).then((res) => {
      setPosts(res.payload);
    });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {!props.post.allpost ? (
        <div style={{ height: "100vh" }}></div>
      ) : (
        <div
          style={{ width: "80vw", display: "flex", justifyContent: "center" }}
        >
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
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps)(Main);
