//상태값 변경: 원래있던 state와 action 합치기
import { POST_FAVORITE, IS_FAVORITE } from "../_actions/favoriteAction";

export default function (state = {}, action) {
  switch (action.type) {
    case POST_FAVORITE:
      return { ...state, favorite: action.payload };
      break;

    case IS_FAVORITE:
      return { ...state, favorite: action.payload };
      break;

    default:
      return state;
  }
}
