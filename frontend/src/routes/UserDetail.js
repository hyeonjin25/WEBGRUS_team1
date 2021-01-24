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
      setPosts(res.payload);
    });
  }, []);
  return (
    <div>
      <div style={{ marginLeft: "150px" }}>
        <h2>{userid}</h2>
        <FollowComponent userid={userid}/>
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
          {Posts
            ? Posts.map((post) => (
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
            : ""}
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
