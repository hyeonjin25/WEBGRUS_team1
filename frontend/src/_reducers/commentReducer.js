//상태값 변경: 원래있던 state와 action 합치기
import {
  GET_COMMENT,
  UPDATE_COMMENT,
  MODIFY_COMMENT,
  DELETE_COMMENT,
} from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_COMMENT:
      return { ...state, comment: action.payload };
      break;

    case UPDATE_COMMENT:
      return { ...state, comment: action.payload };
      break;

    case MODIFY_COMMENT:
      return { ...state, comment: action.payload };
      break;

    case DELETE_COMMENT:
      return { ...state, comment: action.payload };
      break;

    default:
      return state;
  }
}
