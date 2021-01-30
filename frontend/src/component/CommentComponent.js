import React, { useState } from "react";
import { useDispatch, connect } from "react-redux";
import {
  uploadComment,
  modifyComment,
  deleteComment,
} from "../_actions/commentAction";

import { getPostDetail } from "../_actions/postAction";

function CommentComponent(props) {
  const Comments = props.comments;
  const [CommentValue, setCommentValue] = useState(""); //댓글 입력값
  const [ModifyComment, setModifyComment] = useState(""); //수정하는 댓글 아이디
  const [ModifyCommentValue, setModifyCommentValue] = useState(""); //수정하는 댓글 입력값
  const [IsModify, setIsModify] = useState(false);

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
  const commentTime = (time) => {
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
      const body = { content: CommentValue };
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
  const onmodify = (commentid) => {
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
    console.log(ModifyComment);
    setIsModify(true);
  };

  //수정한 댓글 올리기
  const onModifySubmit = (e) => {
    e.preventDefault();

    const body = { content: ModifyCommentValue };
    let commentid = ModifyComment;

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
  const writeComment = (
    <div>
      <input
        style={{ width: "900px", height: "100px" }}
        type='textarea'
        name='Comment'
        value={CommentValue}
        onChange={onChangeComment}
        onKeyPress={onUploadKeyPress}
      />
      {/* 댓글 올리기 버튼 */}
      <button type='button' onClick={onSubmit}>
        댓글
      </button>
    </div>
  );

  const CommentsArray = () => {
    return (
      <div
        style={{
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        {Comments
          ? Comments.map((comment) => (
              <div
                style={{ borderStyle: "solid", margin: "5px" }}
                key={comment._id}
              >
                {/* 수정할 댓글인 경우 수정창 로드 */}
                {IsModify && comment._id === ModifyComment ? (
                  <>
                    <input
                      style={{ width: "900px", height: "100px" }}
                      type='textarea'
                      name='Comment'
                      value={ModifyCommentValue}
                      onChange={onChangeModifyComment}
                      onKeyPress={onModifyPress}
                    />
                    {/* 댓글 올리기 버튼 */}
                    <button type='button' onClick={onModifySubmit}>
                      수정
                    </button>
                    <button
                      type='button'
                      onClick={(e) => {
                        e.preventDefault();
                        setIsModify(false);
                      }}
                    >
                      취소
                    </button>
                  </>
                ) : (
                  // 수정하는 댓글이 아닐 경우 댓글 로드
                  <>
                    <div>작성자: {comment.owner} </div>
                    <div>{comment.content} </div>
                    <div>{commentTime(comment.posttime)} </div>
                    {/* 내가 작성한 댓글일 때만 수정, 삭제 버튼 나타남 */}
                    {auth.userData && auth.userData.userid === comment.owner ? (
                      <div>
                        <button
                          type='button'
                          onClick={(e) => onmodify(comment._id)}
                        >
                          수정
                        </button>
                        <button
                          type='button'
                          onClick={(e) => ondelete(e, comment._id)}
                        >
                          삭제
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
            ))
          : ""}
      </div>
    );
  };

  return (
    <>
      <div
        style={{
          width: "1000px",
          borderStyle: "solid",
          margin: "0 5px 5px 10px",
        }}
      >
        {writeComment}

        {/* 댓글 정보가 준비됐을 경우 로드 */}
        <div
          style={{
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          {/* 댓글이 없을경우와 있을경우 다르게 로드 */}
          {Comments.length === 0 ? (
            <div>댓글이 없습니다...</div>
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
