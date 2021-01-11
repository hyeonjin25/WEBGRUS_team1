//상태값 변경: 원래있던 state와 action 합치기
import { IS_FOLLOW, FOLLOW_TOGGLE } from "../_actions/followAction";

export default function (state = {}, action) {
  switch (action.type) {
    case IS_FOLLOW:
      return { ...state, favorite: action.payload };
      break;

    case FOLLOW_TOGGLE:
      return { ...state, favorite: action.payload };
      break;

    default:
      return state;
  }
}