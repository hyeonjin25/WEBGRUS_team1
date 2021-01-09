import axios from "axios";
import { SERVER_API } from "./config";

export const UPDATE_COMMENT = "update_comment";
export const MODIFY_COMMENT = "modify_comment";
export const DELETE_COMMENT = "delete_comment";


// 액션 생성자 함수들

//포스트 댓글 추가
export function updateComment(postid,body) {
  const request = axios
    .post(`${SERVER_API}/api/posts/${postid}/comments`,body)
    .then((res) => res.data);
  return {
    type: UPDATE_COMMENT,
    payload: request,
  };
}

//포스트 댓글 수정
export function modifyComment(postid,index,body) {
  const request = axios
    .put(`${SERVER_API}/api/posts/${postid}/comments/${index}`,body)
    .then((res) => res.data);
  return {
    type: MODIFY_COMMENT,
    payload: request,
  };
}

//포스트 댓글 삭제
export function deleteComment(postid,index,body) {
  const request = axios
    .delete (`${SERVER_API}/api/posts/${postid}/comments/${index}`,body)
    .then((res) => res.data);
  return {
    type: DELETE_COMMENT,
    payload: request,
  };
}