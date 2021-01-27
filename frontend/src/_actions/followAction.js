import axios from "axios";
import { SERVER_API } from "./config";
import { IS_FOLLOW, FOLLOW_TOGGLE } from "./types";

//팔로우 여부 확인
export function isFollow(userid) {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const request = axios
    .get(`${SERVER_API}/api/users/following/${userid}`, config)
    .then((res) => res.data);
  return {
    type: IS_FOLLOW,
    payload: request,
  };
}

//팔로우 토글
export function followToggle(userid) {
  const request = axios
    .put(`${SERVER_API}/api/users/following/${userid}`)
    .then((res) => res.data);
  return {
    type: FOLLOW_TOGGLE,
    payload: request,
  };
}
