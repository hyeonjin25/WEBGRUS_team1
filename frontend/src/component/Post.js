import React, { useState } from "react";
import { SERVER_API } from "../_actions/config";

import Comment from "@material-ui/icons/Comment";
import Visibility from "@material-ui/icons/Visibility";
import FavoriteComponent from "../component/FavoriteComponent";
import Loading from "./Loading";

function Post({
  postid,
  owner,
  title,
  description,
  files,
  tags,
  posttime,
  likecnt,
  viewcnt,
  commentcnt,
  auth,
}) {
  const [Likecnt, setLikecnt] = useState(likecnt);
  
  const posttimeView = (posttime) => {
    const year = posttime.substring(0, 4);
    const month = posttime.substring(5, 7);
    const date = posttime.substring(8, 10);
    return (
      <div>
        Date: {year}. {month}. {date}.
      </div>
    );
  };


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
          {/* 자신의 아이디 클릭시 마이페이지로,  */}
          {/* 다른 유저의 아이디 클릭시 유저페이지로 */}
          {auth && auth.userid === owner ? (
            <a href={`/mypage`}>{owner}</a>
          ) : (
            <a href={`/userDetail/${owner}`}>{owner}</a>
          )}

          <a href={`/postDetail/${postid}`}>
            {/* 제일 첫번째 사진 보여주기 */}
            <img
              src={`${SERVER_API}/images/${files[0].filename}`}
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
              <div>{title}</div>
            </a>
            <div>{description}</div>
            <div>
              {tags
                ? tags.map((tag) => (
                    <div key={tag} style={{ display: "inline" }}>
                      #{tag}{" "}
                    </div>
                  ))
                : ""}
            </div>
            {posttimeView(posttime)}
            <div
              style={{
                width: "60%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <FavoriteComponent postid={postid} postlikecnt={Likecnt} />
              <div>
                <Visibility /> {viewcnt}
              </div>

              <div>
                <Comment />
                {commentcnt}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
}

export default Post;
