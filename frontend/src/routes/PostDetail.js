import React from "react";
import { useHistory, useParams } from "react-router-dom";
import ViewPostDetail from "../component/ViewPostDetail";
import { postDelete } from "../_actions/postAction";
import { useDispatch, useSelector } from "react-redux";

function PostDetail() {
  const history = useHistory();
  const param = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  //내가 올린 포스트인 경우 수정 및 삭제 버튼 나오게
  if (user.userData && user.userData.userid) {
    return (
      <div>
        <button
          name='modify'
          onClick={() => {
            history.push(`/postModify/${param.postid}`);
          }}
        >
          수정
        </button>
        <button
          name='delete'
          onClick={() => {
            dispatch(postDelete(param.postid)).then((response) => {
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
        <ViewPostDetail />
      </div>
    );
  }
  //로그인 안돼있을 경우 수정 및 삭제 버튼 안나오게
  else {
    return (
      <div>
        <ViewPostDetail />
      </div>
    );
  }
}

export default PostDetail;
