import React, { useState } from "react";
import { useDispatch, connect } from "react-redux";
import {
  uploadComment,
  modifyComment,
  deleteComment,
} from "../_actions/commentAction";

import { getPostDetail } from "../_actions/postAction";

import "./CommentComponent.scss";
import "../index.css";
import "../reset.css";

function CommentComponent(props) {
  const Comments = props.comments;
  const [commentValue, setCommentValue] = useState(""); //댓글 입력값
  const [wantToModify, setModifyComment] = useState(""); //수정하는 댓글 아이디
  const [wantToModifyValue, setModifyCommentValue] = useState(""); //수정하는 댓글 입력값
  const [isModify, setIsModify] = useState(false);

  const dispatch = useDispatch();
  const auth = props.auth;
  const postid = props.postid;

  const onChangeComment = (e) => {
    setCommentValue(e.target.value);
  };

  const onChangeModifyComment = (e) => {
    setModifyCommentValue(e.target.value);
  };

  const onUploadKeyPress = (e) => {
    if (e.key === "Enter") onSubmit(e);
  };

  const onModifyPress = (e) => {
    if (e.key === "Enter") onModifySubmit(e);
  };

  //댓글 시간 스트링
  const CommentTime = (time) => {
    let year = time.substring(0, 4);
    let month = time.substring(5, 7);
    let date = time.substring(8, 10);

    return `${year}. ${month}. ${date}.`;
  };

  //댓글 올리기
  const onSubmit = (e) => {
    e.preventDefault();

    //로그인 돼있을 때만 가능
    if (auth.isAuth) {
      const body = { content: commentValue };
      dispatch(uploadComment({ postid, body }))
        .then((res) => {
          props.updateUploadComment(res.payload.comment);
          setCommentValue("");
        })
        .catch((err) => {
          alert("댓글 입력에 실패했습니다");
          console.log(err);
        });
    } else {
      alert("로그인 후 이용하실 수 있습니다");
    }
  };

  //댓글 수정칸 열기
  const onModify = (commentid) => {
    console.log(commentid);
    //수정할 댓글 찾기
    for (let i = 0; i < Comments.length; i++) {
      // 수정할 댓글인 경우
      if (Comments[i]._id === commentid) {
        setModifyComment(Comments[i]._id);
        setModifyCommentValue(Comments[i].content);
        break;
      }
    }
    console.log(wantToModify);
    setIsModify(true);
  };

  //수정한 댓글 올리기
  const onModifySubmit = (e) => {
    e.preventDefault();

    const body = { content: wantToModifyValue };
    let commentid = wantToModify;

    dispatch(modifyComment({ postid, commentid, body }))
      .then((res) => {
        props.updateModifyComment();
        setIsModify(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //댓글 삭제 요청
  const ondelete = (e, commentid) => {
    let Confirm = window.confirm("정말로 삭제하시겠습니까?");
    if (Confirm) {
      e.preventDefault();

      dispatch(deleteComment({ postid, commentid }))
        .then((res) => {
          props.updateDeleteComment(commentid);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //댓글 작성 창
  const WriteComment = (
    <div className='write-container'>
      <div className='textarea-container'>
        <textarea
          name='Comment'
          value={commentValue}
          onChange={onChangeComment}
          onKeyPress={onUploadKeyPress}
        />
      </div>

      {/* 댓글 올리기 버튼 */}
      <div className='btn-container'>
        <button className='btn-submit' type='button' onClick={onSubmit}>
          댓글
        </button>
        <div className='btn-submit-bottom' />
      </div>
    </div>
  );

  const CommentsArray = () => {
    return (
      <div className='comments-container'>
        {Comments
          ? Comments.map((comment) => (
              <div>
                {/* 수정할 댓글인 경우 수정창 로드 */}
                {isModify && comment._id === wantToModify ? (
                  <div className='input' key={comment._id}>
                    <textarea
                      key={comment._id}
                      type='textarea'
                      name='Comment'
                      rows='4'
                      value={wantToModifyValue}
                      onChange={onChangeModifyComment}
                      onKeyPress={onModifyPress}
                    />
                  </div>
                ) : (
                  // 수정하는 댓글이 아닐 경우 댓글 로드
                  <div className='comment' key={comment._id}>
                    <div className='content'>
                      <span className='bold'>{comment.owner} : </span>
                      {comment.content}
                    </div>
                    <div className='time'>{CommentTime(comment.posttime)}</div>
                  </div>
                )}
                {/* 내가 작성한 댓글일 때만 수정, 삭제 버튼 나타남 */}
                {auth.userData && auth.userData.userid === comment.owner ? (
                  <div className='btn-container'>
                    {isModify && comment._id === wantToModify ? (
                      <>
                        <button
                          className='btn'
                          type='button'
                          onClick={(e) => {
                            e.preventDefault();
                            setIsModify(false);
                          }}
                        >
                          취소
                        </button>
                        <button
                          className='btn'
                          type='button'
                          onClick={onModifySubmit}
                        >
                          수정
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className='btn'
                          type='button'
                          onClick={(e) => ondelete(e, comment._id)}
                        >
                          삭제
                        </button>
                        <button
                          className='btn'
                          type='button'
                          onClick={(e) => onModify(comment._id)}
                        >
                          수정
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))
          : ""}
      </div>
    );
  };

  return (
    <>
      <div className='comments'>
        {WriteComment}
        {/* 댓글 정보가 준비됐을 경우 로드 */}
        <div>
          {/* 댓글이 없을경우와 있을경우 다르게 로드 */}
          {Comments.length === 0 ? (
            <div className='no-comment'>댓글이 없습니다...</div>
          ) : (
            CommentsArray()
          )}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPostDetail })(CommentComponent);
