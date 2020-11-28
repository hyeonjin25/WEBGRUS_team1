//상태값 변경: 원래있던 state와 action 합치기
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/userAction";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
      break;

    case REGISTER_USER:
      return { ...state, registerSuccess: action.payload };
      break;

    case AUTH_USER:
      return { ...state, userData: action.payload };
      break;

    default:
      return state;
  }
}
