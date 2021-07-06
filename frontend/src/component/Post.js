import React from "react";
import { useHistory } from "react-router-dom";
import { SERVER_API } from "../_actions/config";

import SmsIconOutlined from "@material-ui/icons/SmsOutlined";
import VisibilityOutlined from "@material-ui/icons/VisibilityOutlined";
import FavoriteComponent from "../component/FavoriteComponent";

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
  const history = useHistory();

  const posttimeView = (posttime) => {
    const Year = posttime.substring(0, 4);
    const Month = posttime.substring(5, 7);
    const Date = posttime.substring(8, 10);
    return (
      <div
        style={{
          marginRight: 10,
          color: "#4B4B4B",
          fontWeight: 200,
          fontSize: 12,
        }}
      >
        {Year}. {Month}. {Date}.
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: 390,
        minWidth: 250,
        height: 420,
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3px",
        backgroundColor: "white",
        border:'solid 2px #8C8C8C'
      }}
    >
      <div
        style={{
          height: 30,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 500,
          fontSize: 14,
          backgroundColor: "#C4C4C4",
        }}
      >
        {/* 자신의 아이디 클릭시 마이페이지로,  */}
        {/* 다른 유저의 아이디 클릭시 유저페이지로 */}
        <button
          type='button'
          style={{
            marginLeft: 10,
            backgroundColor: "#C4C4C4",
          }}
          onClick={() => {
            if (auth && auth.userid === owner) {
              history.push("/mypage");
            } else {
              history.push(`/userDetail/${owner}`);
            }
          }}
        >
          {owner}
        </button>
        {posttimeView(posttime)}
      </div>
      {/* 한줄데코 */}
      <div
        style={{
          backgroundColor: "#white",
          height: "4px",
          width: "100%",
          borderBottom: "2px solid #C4C4C4",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "95%",
          height: "55%",
          overflow: "hidden",
          margin: "8px 5px",
        }}
      >
        <a href={`/postDetail/${postid}`}>
          {/* 제일 첫번째 사진 보여주기 */}
          <img
            src={`${SERVER_API}/images/${files[0].filename}`}
            style={{
              maxWidth: 230,
              maxHeight: "100%",
              width: "auto",
              height: "auto",
            }}
          />
        </a>
      </div>

      {/* 제목, 작품설명, 태그 */}
      <div
        style={{
          width: "85%",
          height: 114,
          position: "absolute",
          bottom: 13,
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <a href={`/postDetail/${postid}`}>
          <div style={{ fontWeight: 600, marginBottom: 2 }}>{title}</div>
        </a>
        <div style={{ fontWeight: 300, fontSize: "15px", marginBottom: 2 }}>
          {description}
        </div>
        <div
          style={{
            position: "absolute",
            right: 5,
          }}
        >
          {tags
            ? tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    display: "inline",
                    marginLeft: 2,
                    fontWeight: 200,
                    fontSize: "13px",
                    color: "#4B4B4B",
                  }}
                >
                  #{tag}{" "}
                </div>
              ))
            : ""}
        </div>
      </div>

      {/* 좋아요, 뷰수, 댓글수 */}
      <div
        style={{
          position: "absolute",
          bottom: 11,
          width: "85%",
          display: "flex",
          justifyContent: "space-between",
          borderTop: "2px solid #BBBBBB",
          paddingTop: 13,
          marginTop: 10,
          fontWeight: 200,
          fontSize: 12,
        }}
      >
        <FavoriteComponent postid={postid} postlikecnt={likecnt} />
        <div>
          <VisibilityOutlined fontSize='small' color='action' /> {viewcnt}
        </div>

        <div>
          <SmsIconOutlined fontSize='small' color='action' /> {commentcnt}
        </div>
      </div>
    </div>
  );
}

export default Post;
