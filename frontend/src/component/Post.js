import React, { useState, useEffect } from "react";
import { SERVER_API } from "../_actions/config";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import Comment from "@material-ui/icons/Comment";
import Visibility from "@material-ui/icons/Visibility";

import { useSelector } from "react-redux";

function Post({ post }) {
  const postid = post.postid;
  const user = useSelector((state) => state.user.userData.likes);
  
  const [CommentToggle, setCommentToggle] = useState(false);
  const [LikeToggle, setLikeToggle] = useState(false);
  
  // const likes = user.userData.isAuth
  // console.log(likes)
  useEffect(() => {
    // for (let i = 0; i < user.userData.likes.length; i++) {
    //   if (user.userData.likes[i] === postid) {
    //     setLikeToggle(true);
    //     break;
    //   }
    // }
  }, []);

  return (
    <div>
      <div
        style={{
          borderStyle: "solid",
          width: 300,
          height: 400,
          margin: "5px 5px 0 10px",
        }}
      >
        <a href={`${SERVER_API}/postDetail/${postid}`}>
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
          <a href={`${SERVER_API}/postDetail/${postid}`}>
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
            {}
            <div>
              <FavoriteBorder /> {post.likecnt}
            </div>
            <div>
              <Visibility /> {post.viewcnt}
            </div>
            <div
              onClick={() => {
                CommentToggle === false && post.commentcnt > 0
                  ? setCommentToggle(true)
                  : setCommentToggle(false);
              }}
            >
              <Comment />
              {post.commentcnt}
            </div>
          </div>
        </div>
      </div>
      {CommentToggle === true ? (
        <div
          style={{
            borderStyle: "solid",
            width: 300,
            margin: "0 5px 5px 10px",
          }}
        >
          {post.comments.map((comment) => (
            <div>{comment}</div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Post;
