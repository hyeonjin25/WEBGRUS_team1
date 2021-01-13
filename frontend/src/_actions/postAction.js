import axios from "axios";
import { SERVER_API } from "./config";
import {
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  GET_USERPOSTS,
  GET_POSTDETAIL,
  GET_ALLPOST,
  POST_MODIFY,
  POST_DELETE,
} from "./types";

// 액션 생성자 함수들

//포스트 업로드
export const fileUpload = (formdata) => (dispatch, getState) => {
  //localstorage의 token 가져오기
  const token = getState().auth.token;

  // 여러 데이터폼 보낸다는 표시
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  //토큰이 존재하면 Headers에 넣기
  if (token) {
    config.headers["Authorization"] = token;
  }

  return axios
    .post(`${SERVER_API}/api/posts`, formdata, config)
    .then((res) => dispatch({ type: UPLOAD_SUCCESS, payload: res.data }))
    .catch((err) => dispatch({ type: UPLOAD_FAILURE, payload: err }));
};

// 해당 유저의 포스트 정보받기
export function getUserposts(userid) {
  const request = axios
    .get(`${SERVER_API}/api/users/${userid}`)
    .then((res) => res.data);
  return {
    type: GET_USERPOSTS,
    payload: request,
  };
}

//해당 포스트의 디테일 정보받기
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
export const postModify = (data) => (getState) => {
  //localstorage의 token 가져오기
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //토큰이 존재하면 Headers에 넣기
  if (token) {
    config.headers["Authorization"] = token;
  }
  const request = axios
    .put(
      `${SERVER_API}/api/posts/${data.postid}`,
      data.formdata,
      data.config,
      config
    )
    .then((res) => res.data);

  return {
    type: POST_MODIFY,
    payload: request,
  };
};

//해당 포스트의 삭제
export const postDelete = (postid) => (getState) => {
  //localstorage의 token 가져오기
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //토큰이 존재하면 Headers에 넣기
  if (token) {
    config.headers["Authorization"] = token;
  }
  const request = axios
    .delete(`${SERVER_API}/api/posts/${postid}`, config)
    .then((res) => res.data);

  return {
    type: POST_DELETE,
    payload: request,
  };
};
