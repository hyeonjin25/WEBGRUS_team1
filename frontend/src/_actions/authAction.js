import axios from "axios";
import { SERVER_API } from "./config";
import {
  AUTH_LOADING,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_LOADING,
  LOGOUT_SUCCESS,
} from "./types";

//
// authentication 확인
//
export const authenticationCheck = () => (dispatch) => {
  //로딩중
  dispatch({
    type: AUTH_LOADING,
  });

  //localstorage의 token 가져오기
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  return axios
    .get(`${SERVER_API}/api/auth/check`)
    .then((res) => {
      dispatch({
        type: AUTH_SUCCESS,
        payload: res.data,
      });
      return true
    })
    .catch((err) => {
      dispatch({
        type: AUTH_FAILURE,
        payload: err,
      });
      return false
    });
};

//
//로그인
//
export const loginUser = (data) => (dispatch) => {
  //로딩중
  dispatch({
    type: LOGIN_LOADING,
  });

  return axios
    .post(`${SERVER_API}/api/auth/login`, data)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      return true;
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAILURE,
        payload: err,
      });
      return false;
    });
};

//
//회원가입
//
export const registerUser = (data) => (dispatch) => {
  //로딩중
  dispatch({
    type: REGISTER_LOADING,
  });

  return axios
    .post(`${SERVER_API}/api/users`, data)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      return true;
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_FAILURE,
        payload: err,
      });
      return false;
    });
};

//
//로그아웃
//
export const logoutUser = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
