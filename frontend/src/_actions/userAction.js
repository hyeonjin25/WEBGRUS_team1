import axios from "axios";
import { SERVER_API } from "./config";

//action type
export const LOGIN_USER = "login_user";
export const REGISTER_USER = "register_user";
export const AUTH_USER = "auth_user";

//액션 생성자 함수들
export function loginUser(data) {
  //서버에서 받은 response를 request에 저장
  const request = axios
    .post(`${SERVER_API}/auth/login`, data)
    .then((res) => res.data);
  // const request = { loginSuccess: true, userId: data.Id };
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(data) {
  const request = axios
    .post(`${SERVER_API}/user`, data)
    .then((res) => res.data);
  // const request = { registerSuccess: true };
  return {
    type: REGISTER_USER,
    payload: request,
  };
}
export function auth() {
  const request = axios
    .get(`${SERVER_API}/auth`)
    .then((res) => res.data);
  return {
    type: AUTH_USER,
    payload: request,
  };
}
