import axios from "axios";
import { SERVER_API } from "./config";

//action type
export const UPLOAD_FILE = "upload_file";

// 액션 생성자 함수들

//포스트 업로드
export function fileUpload(data) {
  const request = axios
    .post(`${SERVER_API}/api/posts`, data)
    .then((res) => res.data);
  return {
    type: UPLOAD_FILE,
    payload: request,
  };
}

// //해당 유저의 포스트 정보받기
// export function fileUpload(data) {
//     const request = axios
//       .post(`${SERVER_API}/api/posts`, data)
//       .then((res) => res.data);
//     return {
//       type: UPLOAD_FILE,
//       payload: request,
//     };
//   }
