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

  const [Post, setPost] = useState([]);
  const [Posttime, setPosttime] = useState("");
  const [Comments, setComments] = useState([]);

  useEffect(() => {
    dispatch(getPostDetail(postid)).then((res) => {
      console.log(res)
      setPost(res.payload);
      setPosttime(res.payload.posttime);
      setComments(res.payload.comments);
    });
  }, []);

  let year = Posttime.substring(0, 4);
  let month = Posttime.substring(5, 7);
  let date = Posttime.substring(8, 10);

  //포스트 시간 스트링
  const posttimeView = `Date: ${year}. ${month}. ${date}.`;

  //댓글 추가 업데이트
  const updateUploadComment = (newComment) => {
    setComments(Comments.concat(newComment));
  };

  //댓글 수정 업데이트
  const updateModifyComment = () => {
    dispatch(getPostDetail(postid)).then((res) => {
      setComments(res.payload.comments);
    });
  };

  //댓글 삭제 업데이트
  const updateDeleteComment = (commentid) => {
    setComments(Comments.filter((comment) => comment._id !== commentid));
  };

  const postButton = () => {
    //내가 올린 포스트인 경우 수정 및 삭제 버튼 나오게
    if (auth.userData && auth.userData.userid === Post.owner) {
      return (
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
              let Confirm = window.confirm('정말로 삭제하시겠습니까?')
              if(Confirm){
                e.preventDefault();
              dispatch(postDelete(postid)).then((response) => {
                //삭제 성공시 마이페이지로 이동
                if (response) {
                  history.push(`/mypage`);
                } else {
                  alert("게시물 삭제에 실패했습니다.");
                }
              });
              }
            }}
          >
            삭제
          </button>
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
            <div style={{ marginLeft: "150px" }}>
              <h2>{Post.owner}</h2>
              <FollowComponent userid={Post.owner} />
            </div>
          )}
        </>
      );
    }
  };

  return (
    <>
      {postButton()}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ViewPostDetail
          postid={Post._id}
          title={Post.title}
          description={Post.description}
          files={Post.files}
          tags={Post.tags}
          posttime={posttimeView}
          likecnt={Post.likecnt}
          viewcnt={Post.viewcnt}
          commentcnt={Post.commentcnt}
        />
        <CommentComponent
          postid={postid}
          comments={Comments}
          updateUploadComment={updateUploadComment}
          updateModifyComment={updateModifyComment}
          updateDeleteComment={updateDeleteComment}
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps)(PostDetail);
