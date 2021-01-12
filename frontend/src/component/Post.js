import React, { useState, useEffect } from "react";
import { SERVER_API } from "../_actions/config";

import Comment from "@material-ui/icons/Comment";
import Visibility from "@material-ui/icons/Visibility";
import FavoriteComponent from "../component/FavoriteComponent";
import CommentComponent from "../component/CommentComponent";

function Post({ post }) {
  const postid = post.postid;

  const [CommentToggle, setCommentToggle] = useState(false);
  const [CommentNum, setCommentNum] = useState(post.commentcnt);
  const [ViewNum, setViewNum] = useState(post.viewcnt);

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
        <a href={`${SERVER_API}/userDetail/${post.owner}`}>{post.owner}</a>
        <a href={`${SERVER_API}/postDetail/${post.owner}/${postid}`}>
          {/* 제일 첫번째 사진 보여주기 */}
          <img
            src={`${SERVER_API}/${post.photos[0].path}`}
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
          <a href={`${SERVER_API}/postDetail/${post.owner}/${postid}`}>
            <div>{post.title}</div>
          </a>
          <div>{post.description}</div>
          <div>Date: {post.posttime}</div>
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

            <div
              // 댓글 창 열고 닫히기
              onClick={() => {
                CommentToggle === false && CommentNum > 0
                  ? setCommentToggle(true)
                  : setCommentToggle(false);
              }}
            >
              <Comment />
              {CommentNum}
            </div>
          </div>
        </div>
        <CommentComponent
          postid={postid}
          comments={post.comments}
          CommentToggle={CommentToggle}
        />
      </div>
    </div>
  );
}

export default Post;
