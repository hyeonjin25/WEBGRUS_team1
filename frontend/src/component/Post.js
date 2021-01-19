import React, { useState } from "react";
import { SERVER_API } from "../_actions/config";

import Comment from "@material-ui/icons/Comment";
import Visibility from "@material-ui/icons/Visibility";
import FavoriteComponent from "../component/FavoriteComponent";

function Post({ post }) {
  const [CommentNum, setCommentNum] = useState(post.commentcnt);
  const [ViewNum, setViewNum] = useState(post.viewcnt);
  const [Tags, setTags] = useState([]);

  const postid = post._id;
  const posttime = post.posttime;
  const year = posttime.substring(0, 4);
  const month = posttime.substring(5, 7);
  const date = posttime.substring(8, 10);

  return (
    <div>
      <div
        style={{
          borderStyle: "solid",
          width: 300,
          margin: "5px 5px 0 10px",
          padding: "5px",
        }}
      >
        <a href={`/userDetail/${post.owner}`}>{post.owner}</a>
        <a href={`/postDetail/${postid}`}>
          {/* 제일 첫번째 사진 보여주기 */}
          <img
            src={`${SERVER_API}/images/${post.files[0].filename}`}
            style={{ width: 290, height: 290 }}
          />
        </a>
        <div
          style={{
            width: "90%",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          <a href={`/postDetail/${postid}`}>
            <div>{post.title}</div>
          </a>
          <div>{post.description}</div>
          <div>
            {Tags.map((tag) => (
              <div key={tag}>#{tag}</div>
            ))}
          </div>
          <div>
            Date: {year}. {month}. {date}.
          </div>
          <div
            style={{
              width: "60%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <FavoriteComponent postid={postid} postlikecnt={post.likecnt} />
            <div>
              <Visibility /> {ViewNum}
            </div>

            <div>
              <Comment />
              {CommentNum}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
