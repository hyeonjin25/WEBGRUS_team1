import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ViewPostDetail from "../component/ViewPostDetail";
import { connect, useDispatch, useSelector } from "react-redux";

import FollowComponent from "../component/FollowComponent";

import { postDelete } from "../_actions/postAction";
import { getPostDetail } from "../_actions/postAction";
import CommentComponent from "../component/CommentComponent";

function PostDetail(props) {
  const history = useHistory();
  const param = useParams();
  const postid = param.postid;
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [Owner, setOwner] = useState("");
  const [Post, setPost] = useState([]);
  const [Posttime, setPosttime] = useState("");

  useEffect(() => {
    dispatch(getPostDetail(postid)).then((res) => {
      setPost(res.payload);
      setOwner(res.payload.owner);
      setPosttime(res.payload.posttime);
    });
  }, []);

  let year = Posttime.substring(0, 4);
  let month = Posttime.substring(5, 7);
  let date = Posttime.substring(8, 10);

  const posttime = `${year}. ${month}. ${date}.`;

  const Postview = (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <ViewPostDetail
        post={Post}
        files={Post.files}
        posttime={posttime}
        tags={Post.tags}
      />
      <CommentComponent postid={postid} />
    </div>
  );

  //내가 올린 포스트인 경우 수정 및 삭제 버튼 나오게
  if (auth.userData && auth.userData.userid === Owner) {
    return (
      <div>
        <div style={{ marginLeft: "200px" }}>
          <button
            name='modify'
            onClick={() => {
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
        {Postview}
      </div>
    );
  }
  //내가 올린 게시물이 아닌 경우, 팔로우 버튼
  else {
    return (
      <>
        {!props.post.postDetail ? (
          <div style={{ height: "100vh" }}></div>
        ) : (
          <div>
            <div style={{ marginLeft: "150px" }}>
              <h2>{Owner}</h2>
              <FollowComponent userid={Owner} />
            </div>
            {Postview}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps)(PostDetail);
