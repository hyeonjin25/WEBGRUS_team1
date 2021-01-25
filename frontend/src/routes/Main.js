import React, { useEffect, useState } from "react";
import Post from "../component/Post";
import { getAllpost } from "../_actions/postAction";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Main(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [Posts, setPosts] = useState([]);

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
          style={{
            width: "80vw",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
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
