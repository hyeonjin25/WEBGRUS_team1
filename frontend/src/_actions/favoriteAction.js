import axios from "axios";
import { SERVER_API } from "./config";

export const POST_FAVORITE = "post_favorite";
export const IS_FAVORITE = "my_favorite";

// 액션 생성자 함수들

//포스트 좋아요 토글
export function postFavorite(postid,bool) {
  const request = axios
    .put(`${SERVER_API}/api/users/favorites/${postid}`,bool)
    .then((res) => res.data);
  return {
    type: POST_FAVORITE,
    payload: request,
  };
}


  //포스트 좋아요 여부 확인
export function isFavorite(postid) {
    const request = axios
      .get(`${SERVER_API}/api/users/favorites/${postid}`)
      .then((res) => res.data);
    return {
      type: IS_FAVORITE,
      payload: request,
    };
  }