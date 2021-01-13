import React, { useState, useEffect } from "react";
import {
  updateComment,
  modifyComment,
  deleteComment,
} from "../_actions/commentAction";

import { useDispatch } from "react-redux";

function CommentComponent({ postid, comments, CommentToggle }) {
  const [CommentValue, setCommentValue] = useState("");
  const [ModifyCommentValue, setModifyCommentValue] = useState("");
  const [Comments, setComments] = useState(comments);
  const [IsModify, setIsModify] = useState(false);
  const [IsLogined, setIsLogined] = useState(false);

  const userid = "hj2525";

  const dispatch = useDispatch();

  useEffect(() => {
    if (userid) {
      setIsLogined(true);
    }
  }, []);

  const onChangeComment = (e) => {
    setCommentValue(e.target.value);
    console.log(CommentValue);
  };

  //댓글 올리기
  const onSubmit = (e) => {
    e.preventDefault();

    const body = { userid, content: CommentValue };
    dispatch(updateComment(postid, body))
      .then((res) => {
        setComments(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //댓글 수정칸 열기
  const onmodify = (e, index) => {
    e.preventDefault();
    //수정할 댓글 찾기
    for (let i = 0; i < Comments.length; i++) {
      if (Comments[i].index === index) {
        setModifyCommentValue(Comments[i].content);
        break;
      }
    }
    setIsModify(true);
  };

  //수정한 댓글 올리기
  const onModifySubmit = (e, index) => {
    e.preventDefault();

    const body = { userid, content: ModifyCommentValue };
    dispatch(modifyComment(postid, index, body))
      .then((res) => {
        setComments(res);
        setIsModify(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //댓글 삭제 요청
  const ondelete = (e, index) => {
    e.preventDefault();

    const body = { userid };
    dispatch(deleteComment(postid, index, body))
      .then((res) => {
        setComments(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //댓글 작성 창
  const writeComment = () => {
    return (
      <div>
        {IsModify === false ? (
          <>
            <input
              type='textarea'
              name='Comment'
              value=''
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
              type='textarea'
              name='Comment'
              value={ModifyCommentValue}
              onChange={onChangeComment}
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
  };

  return (
    <div>
      {CommentToggle === true ? (
        <div
          style={{
            borderStyle: "solid",
            margin: "0 5px 5px 10px",
          }}
        >
          <div
            style={{
              height: "100px",
              overflowY: "auto",
            }}
          >
            {Comments.map((comment) => (
              <div style={{ borderStyle: "solid", margin: "5px" }}>
                <div>작성자: {comment.owner} </div>
                <div>{comment.content} </div>
                <div>{comment.posttime} </div>
                {/* 내가 작성한 댓글일 때만 수정, 삭제 버튼 나타남 */}
                {userid === comment.owner ? (
                  <div>
                    <button
                      type='button'
                      onClick={(e) => onmodify(e, comment.index)}
                    >
                      수정
                    </button>
                    <button
                      type='button'
                      onClick={(e) => ondelete(e, comment.index)}
                    >
                      삭제
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
          {IsLogined ? <writeComment /> : ""}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default CommentComponent;
