import axios from "axios";
import { SERVER_API } from "./config";
import { UPDATE_COMMENT, MODIFY_COMMENT, DELETE_COMMENT } from "./types";


//포스트 댓글 추가
export function updateComment(postid, body) {
  const request = axios
    .post(`${SERVER_API}/api/posts/${postid}/comments`, body)
    .then((res) => res.data);
  return {
    type: UPDATE_COMMENT,
    payload: request,
  };
}

//포스트 댓글 수정
export function modifyComment(postid, index, body) {
  const request = axios
    .put(`${SERVER_API}/api/posts/${postid}/comments/${index}`, body)
    .then((res) => res.data);
  return {
    type: MODIFY_COMMENT,
    payload: request,
  };
}

//포스트 댓글 삭제
export function deleteComment(postid, index, body) {
  const request = axios
    .delete(`${SERVER_API}/api/posts/${postid}/comments/${index}`, body)
    .then((res) => res.data);
  return {
    type: DELETE_COMMENT,
    payload: request,
  };
}
