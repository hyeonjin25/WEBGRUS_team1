import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, connect } from "react-redux";
import { modifyComment, deleteComment } from "../_actions/commentAction";

import { getPostDetail } from "../_actions/postAction";
import Loading from "./Loading";

function CommentComponent(props) {
  const [Comments, setComments] = useState([props.comments]);
  const [CommentValue, setCommentValue] = useState(""); //댓글 입력값
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

  //댓글 시간 스트링
  const commentTime = (time) => {
    let year = time.substring(0, 4);
    let month = time.substring(5, 7);
    let date = time.substring(8, 10);

    return `${year}. ${month}. ${date}.`;
  };

  //댓글 업데이트
  const updateComment = useCallback((newComment) => {
    setComments(Comments.concat(newComment));
  }, []);

  //댓글 삭제 업데이트
  const updateDeleteComment = useCallback((commentid) => {
    setComments(Comments.Filter((comment) => comment._id !== commentid));
  }, []);

  //댓글 올리기
  const onSubmit = (e) => {
    e.preventDefault();

    //로그인 돼있을 때만 가능
    if (auth.isAuth) {
      const body = { content: CommentValue };
      dispatch(updateComment({ postid, body }))
        .then((res) => {
          updateComment(res.payload);
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
        updateComment(res.payload);
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
        updateDeleteComment(commentid);
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
                key={comment}
              >
                <div>작성자: {comment.owner} </div>
                <div>{comment.content} </div>
                <div>{commentTime(comment.posttime)} </div>
                {/* 내가 작성한 댓글일 때만 수정, 삭제 버튼 나타남 */}
                {auth.userData && auth.userData.userid === comment.owner ? (
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
    );
  };

  //댓글 정보가 준비됐을 경우 로드
  if (Comments) {
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

          {CommentsArray()}
        </div>
      </>
    );
  } else {
    return <div></div>;
  }
}

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPostDetail })(CommentComponent);
