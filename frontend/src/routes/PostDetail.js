import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";

import ViewPostDetail from "../component/ViewPostDetail";
import FollowComponent from "../component/FollowComponent";
import CommentComponent from "../component/CommentComponent";

import { postDelete } from "../_actions/postAction";
import { getPostDetail } from "../_actions/postAction";
import { getComment } from "../_actions/commentAction";

import "./PostDetail.scss";
import "../index.css";
import "../reset.css";

function PostDetail(props) {
  const history = useHistory();
  const param = useParams();
  const postid = param.postid;
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [post, setPost] = useState([]);
  const [posttime, setPosttime] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    dispatch(getPostDetail(postid)).then((res) => {
      console.log(res);
      setPost(res.payload);
      setPosttime(res.payload.posttime);
    });
    dispatch(getComment(postid)).then((res) => {
      console.log(res);
      setComments(res.payload);
    });
  }, []);

  let year = posttime.substring(0, 4);
  let month = posttime.substring(5, 7);
  let date = posttime.substring(8, 10);

  //포스트 시간 스트링
  const PosttimeView = `Date: ${year}. ${month}. ${date}.`;

  //댓글 추가 업데이트
  const updateUploadComment = (newComment) => {
    setComments(comments.concat(newComment));
  };

  //댓글 수정 업데이트
  const updateModifyComment = () => {
    dispatch(getComment(postid)).then((res) => {
      console.log(res);
      setComments(res.payload);
    });
  };

  //댓글 삭제 업데이트
  const updateDeleteComment = (commentid) => {
    setComments(comments.filter((comment) => comment._id !== commentid));
  };

  const postButton = () => {
    //내가 올린 포스트인 경우 수정 및 삭제 버튼 나오게
    if (auth.userData && auth.userData.userid === post.owner) {
      return (
        <div className='top-container'>
          <div className='btn-container btn-container-top'>
            <button
              name='modify'
              className='top-btn'
              onClick={() => {
                history.push(`/postModify/${postid}`);
              }}
            >
              수정
            </button>
            <div className='btn-bottom' />
          </div>
          <div className='btn-container btn-container-top'>
            <button
              name='delete'
              className='top-btn'
              onClick={(e) => {
                let Confirm = window.confirm("정말로 삭제하시겠습니까?");
                if (Confirm) {
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
            <div className='btn-bottom' />
          </div>
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
            <div className='top-container'>
              <Link to={`/userDetail/${post.owner}`}>
                <h2>{post.owner}</h2>
              </Link>
              <div className='follow'>
                <FollowComponent userid={post.owner} />
              </div>
            </div>
          )}
        </>
      );
    }
  };

  return (
    <>
      <div
        className='post-detail'
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {postButton()}
        <ViewPostDetail
          postid={post._id}
          title={post.title}
          description={post.description}
          files={post.files}
          tags={post.tags}
          posttime={PosttimeView}
          likecnt={post.likecnt}
          viewcnt={post.viewcnt}
          commentcnt={post.commentcnt}
        />
        <CommentComponent
          postid={postid}
          comments={comments}
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
