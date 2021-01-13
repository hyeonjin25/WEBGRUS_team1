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
  LOGOUT_LOADING,
  LOGOUT_FAILURE
} from "./types";

//
// authentication 확인
//
export const authenticationCheck = () => (dispatch, getState) => {
  // //로딩중
  // dispatch({
  //   type: AUTH_LOADING,
  // });

  // //localstorage의 token 가져오기
  // const token = getState().auth.token;

  // //Headers
  // const config = {
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  // };

  // //토큰이 존재하면 Headers에 넣기
  // if (token) {
  //   config.headers["Authorization"] = token;
  // }

  // return axios
  //   .post(`${SERVER_API}/api/auth/check`, config)
  //   .then((res) => {
  //     dispatch({
  //       type: AUTH_SUCCESS,
  //       payload: res.data,
  //     });
  //   })
  //   .catch((err) => {
  //     dispatch({
  //       type: AUTH_FAILURE,
  //       payload: err,
  //     });
  //   });
  return dispatch({
    type: AUTH_SUCCESS,
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
  return (dispatch) => {
    //로딩중
    dispatch({
      type: LOGOUT_LOADING,
    });

    return axios
      .post(`${SERVER_API}/api/auth/logout`)
      .then((res) => {
        dispatch({
          type: LOGOUT_SUCCESS,
          payload: res.data,
        });
        return true;
      })
      .catch((err) => {
        dispatch({
          type: LOGOUT_FAILURE,
          payload: err,
        });
        return false;
      });
  };
};
