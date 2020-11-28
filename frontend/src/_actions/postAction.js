import axios from "axios";
import { SERVER_API } from "./config";

//action type
export const UPLOAD_FILE = "upload_file";

//액션 생성자 함수들
export function fileUpload(data) {
  const request = axios
    .post(`${SERVER_API}/post`, data)
    .then((res) => res.data);
  return {
    type: UPLOAD_FILE,
    payload: request,
  };
}
