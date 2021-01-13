import axios from "axios";
import { SERVER_API } from "./config";
import { IS_FOLLOW, FOLLOW_TOGGLE } from "./types";

//팔로우 여부 확인
export function isFollow(data) {
  const request = axios.get(`${SERVER_API}/`).then((res) => res.data);
  return{
      type:IS_FOLLOW,
      payload:request
  }
}

//팔로우 토글
export function followToggle(postid,bool) {
    const request = axios
      .put(`${SERVER_API}/`)
      .then((res) => res.data);
    return {
      type: FOLLOW_TOGGLE,
      payload: request,
    };
  }