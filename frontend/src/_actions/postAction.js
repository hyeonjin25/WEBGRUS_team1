import axios from "axios";
import { SERVER_API } from "./config";
import {
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  GET_FAVORITEPOSTS,
  GET_USERPOSTS,
  GET_POSTDETAIL,
  GET_ALLPOST,
  MODIFY_SUCCESS,
  MODIFY_FAILURE,
  POST_DELETE,
} from "./types";

// 액션 생성자 함수들

//포스트 업로드
export const fileUpload = (formdata) => (dispatch) => {
  // 여러 데이터폼 보낸다는 표시
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return axios
    .post(`${SERVER_API}/api/posts`, formdata, config)
    .then((res) => {
      dispatch({ type: UPLOAD_SUCCESS, payload: res.data });
      return true;
    })
    .catch((err) => {
      dispatch({ type: UPLOAD_FAILURE, payload: err });
      return false;
    });
};

// 해당 유저의 포스트 정보받기
export function getUserposts({ userid, page }) {
  const request = axios
    .get(`${SERVER_API}/api/posts/users/${userid}?page=${page}&sortby=times`)
    .then((res) => res.data);
  return {
    type: GET_USERPOSTS,
    payload: request,
  };
}

// 해당 유저가 좋아요한 포스트 정보받기
export function getFavoriteposts({ userid, page }) {
  const request = axios
    .get(`${SERVER_API}/api/posts/favorites/${userid}?page=${page}`)
    .then((res) => res.data);
  return {
    type: GET_FAVORITEPOSTS,
    payload: request,
  };
}

//해당 포스트의 디테일 정보받기
export function getPostDetail(postid) {
  const request = axios
    .get(`${SERVER_API}/api/posts/content/${postid}`)
    .then((res) => res.data);

  return {
    type: GET_POSTDETAIL,
    payload: request,
  };
}

//모든 포스트의 정보받기
export const getAllpost = (sort, page) => {
  const request = axios
    .get(`${SERVER_API}/api/posts/all?page=${page}&sortby=${sort}`)
    .then((res) => res.data)
    .catch((res) => {
      console.log(res);
      return [];
    });
  return {
    type: GET_ALLPOST,
    payload: request,
  };
};

//해당 포스트의 수정
export const postModify = ({ formdata, postid }) => (dispatch) => {
  // 여러 데이터폼 보낸다는 표시
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  return axios
    .put(`${SERVER_API}/api/posts/${postid}`, formdata, config)
    .then((res) => {
      dispatch({ type: MODIFY_SUCCESS, payload: res.data });
      return true;
    })
    .catch((err) => {
      dispatch({ type: MODIFY_FAILURE, payload: err });
      return false;
    });
};

//해당 포스트의 삭제
export const postDelete = (postid) => {
  const request = axios
    .delete(`${SERVER_API}/api/posts/${postid}`)
    .then((res) => res.data);

  return {
    type: POST_DELETE,
    payload: request,
  };
};
