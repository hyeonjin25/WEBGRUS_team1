import axios from "axios";
import { SERVER_API } from "./config";

//action type
export const LOGIN_USER = "login_user";
export const REGISTER_USER = "register_user";
export const AUTH_USER = "auth_user";

//액션 생성자 함수들

//로그인
export function loginUser(data) {
  //서버에서 받은 response를 request에 저장
  const request = axios
    .post(`${SERVER_API}/api/auth/login`, data)
    .then((res) => res.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}


//회원가입
export function registerUser(data) {
  const request = axios
    .post(`${SERVER_API}/api/users`, data)
    .then((res) => res.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

//인증
export function auth() {
  const request = axios
    .post(`${SERVER_API}/api/auth/check`)
    .then((res) => res.data);
  return {
    type: AUTH_USER,
    payload: request,
  };
}
