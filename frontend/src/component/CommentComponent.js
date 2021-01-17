import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import {
  updateComment,
  modifyComment,
  deleteComment,
} from "../_actions/commentAction";

import { getPostDetail } from "../_actions/postAction";

function CommentComponent(props) {
  const [Comments, setComments] = useState([]);
  const [CommentValue, setCommentValue] = useState(""); //댓글 입력값
  const [ModifyCommentValue, setModifyCommentValue] = useState(""); //수정하는 댓글 입력값
  const [IsModify, setIsModify] = useState(false);

  const postid = props.postid;

  useEffect(() => {
    props.getPostDetail(postid);
    // .then((res) => {
    //   setComments(res.payload.comments);
    // });
    if (props.post.postDetail) {
      setComments(props.post.postDetail.comments);
      console.log(props.post.postDetail);
    }
  }, []);

  const dispatch = useDispatch();
  const auth = props.auth;

  const onChangeComment = (e) => {
    setCommentValue(e.target.value);
  };

  const onChangeModifyComment = (e) => {
    setModifyCommentValue(e.target.value);
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

    if (auth.isAuth) {
      const body = { content: CommentValue };
      dispatch(updateComment({ postid, body }))
        .then((res) => {
          dispatch(getPostDetail(postid)).then((res) => {
            setComments(res.payload.comments);
          });
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
      if (Comments[i]._id === commentid) {
        setModifyCommentValue(Comments[i].content);
        console.log(Comments[i].content);
        break;
      }
    }
    console.log(ModifyCommentValue);
    setIsModify(true);
  };

  //수정한 댓글 올리기
  const onModifySubmit = (e, commentid) => {
    e.preventDefault();

    const body = { content: ModifyCommentValue };
    dispatch(modifyComment({ postid, commentid, body }))
      .then((res) => {
        dispatch(getPostDetail(postid)).then((res) => {
          setComments(res.payload.comments);
        });
        setIsModify(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //댓글 삭제 요청
  const ondelete = (e, commentid) => {
    e.preventDefault();

    dispatch(deleteComment({ postid, commentid }))
      .then((res) => {
        dispatch(getPostDetail(postid)).then((res) => {
          setComments(res.payload.comments);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //댓글 작성 창
  const writeComment = (
    <div>
      {IsModify === false ? (
        <>
          <input
            style={{ width: "900px", height: "100px" }}
            type='textarea'
            name='Comment'
            value={CommentValue}
            onChange={onChangeComment}
          />
          {/* 댓글 올리기 버튼 */}
          <button type='button' onClick={onSubmit}>
            댓글
          </button>
        </>
      ) : (
        <>
          <input
            style={{ width: "900px", height: "100px" }}
            type='textarea'
            name='Comment'
            value={ModifyCommentValue}
            onChange={onChangeModifyComment}
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
      )}
    </div>
  );

  return (
    <>
      {!props.post.postDetail ? (
        ""
      ) : (
        <div
          style={{
            width: "1000px",
            borderStyle: "solid",
            margin: "0 5px 5px 10px",
          }}
        >
          {writeComment}
          {!props.post.postDetail ? (
            <div></div>
          ) : (
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
                      key={comment}
                    >
                      <div>작성자: {comment.owner} </div>
                      <div>{comment.content} </div>
                      <div>{commentTime(comment.posttime)} </div>
                      {/* 내가 작성한 댓글일 때만 수정, 삭제 버튼 나타남 */}
                      {auth.userData &&
                      auth.userData.userid === comment.owner ? (
                        <div>
                          <button type='button' onClick={onmodify(comment._id)}>
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
                    </div>
                  ))
                : ""}
            </div>
          )}
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPostDetail })(CommentComponent);
