//상태값 변경: 원래있던 state와 action 합치기
import { UPLOAD_FILE } from "../_actions/postAction";

export default function (state = {}, action) {
  switch (action.type) {
    case UPLOAD_FILE:
      return { ...state, uploadSuccess: action.payload };
      break;

    default:
      return state;
  }
}
