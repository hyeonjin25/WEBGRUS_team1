import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ViewPostDetail from "../component/ViewPostDetail";
import { postDelete } from "../_actions/postAction";
import { useDispatch, useSelector } from "react-redux";

import FollowComponent from "../component/FollowComponent";

function PostDetail() {
  const history = useHistory();
  const param = useParams();
  const postid = param.postid;
  const userid = param.userid;
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  //내가 올린 포스트인 경우 수정 및 삭제 버튼 나오게
  if (user.userData && user.userData.userid === userid) {
    return (
      <div>
        <div style={{ marginLeft: "200px" }}>
          <button
            name='modify'
            onClick={(e) => {
              e.preventDefault();
              history.push(`/postModify/${postid}`);
            }}
          >
            수정
          </button>
          <button
            name='delete'
            onClick={(e) => {
              e.preventDefault();
              dispatch(postDelete(postid)).then((response) => {
                //삭제 성공시 마이페이지로 이동
                if (response) {
                  history.push(`/mypage`);
                } else {
                  alert("포스트 삭제에 실패했습니다.");
                }
              });
            }}
          >
            삭제
          </button>
        </div>
        <ViewPostDetail />
      </div>
    );
  }
  //내가 올린 게시물이 아닌 경우, 팔로우 버튼
  else if (user === undefined) {
    return (
      <div>
        <div style={{ marginLeft: "150px" }}>
          <h2>{userid}</h2>
          <FollowComponent userid={userid} />
        </div>
        <ViewPostDetail />
      </div>
    );
  } else {
    return <div style={{ height: 1000 }}></div>;
  }
}

export default PostDetail;
