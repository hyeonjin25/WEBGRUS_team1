import axios from "axios";
import { SERVER_API } from "./config";

//action type
export const UPLOAD_FILE = "upload_file";
export const GET_MYPOSTS = "get_myposts";
export const GET_POSTDETAIL = "get_postdetail";
export const GET_ALLPOST = "get_allpost";
export const POST_MODIFY = "post_modify";
export const POST_DELETE = "post_delete";

// 액션 생성자 함수들

//포스트 업로드
export function fileUpload(formdata, config) {
  for (let value of formdata.values()) {
    console.log(value);
  }
  const request = axios
    .post(`${SERVER_API}/api/posts`, formdata, config)
    .then((res) => res.data);
  return {
    type: UPLOAD_FILE,
    payload: request,
  };
}

// 해당 유저의 포스트 정보받기
export function getMyposts(userid) {
  const request = axios
    .get(`${SERVER_API}/api/users/${userid}`)
    .then((res) => res.data);
  return {
    type: GET_MYPOSTS,
    payload: request,
  };
}

//해당 포스트의 정보받기
export function getPostDetail(param) {
  const request = axios
    .get(`${SERVER_API}/api/posts/content/${param.postid}`)
    .then((res) => res.data);

  return {
    type: GET_POSTDETAIL,
    payload: request,
  };
}

//모든 포스트의 정보받기
export function getAllpost() {
  const request = axios
    .get(`${SERVER_API}/api/posts/all`)
    .then((res) => res.data);

  return {
    type: GET_ALLPOST,
    payload: request,
  };
}

//해당 포스트의 수정
export function postModify(data) {
  const request = axios
    .put(`${SERVER_API}/api/posts/${data.postid}`, data.formdata, data.config)
    .then((res) => res.data);

  return {
    type: POST_MODIFY,
    payload: request,
  };
}

//해당 포스트의 삭제
export function postDelete(postid) {
  const request = axios
    .delete(`${SERVER_API}/api/posts/${postid}`)
    .then((res) => res.data);

  return {
    type: POST_DELETE,
    payload: request,
  };
}
