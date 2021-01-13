//상태값 변경: 원래있던 state와 action 합치기
import {
  AUTH_LOADING,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_LOADING,
  LOGOUT_SUCCESS,
  LOGOUT_LOADING,
  LOGOUT_FAILURE,
} from "../_actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuth: null,
  userData: null,
  status: {
    auth: "init",
    login: "init",
    logout: "init",
    register: "init",
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_LOADING:
      return { ...state, isAuth: true, status: { auth: "LOADING" } };

    case AUTH_SUCCESS:
      return {
        ...state,
        isAuth: true,
        userData: action.payload,
        status: { auth: "SUCCESS" },
      };

    case AUTH_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuth: false,
        userData: null,
        status: { auth: "FAILURE" },
      };

    case LOGIN_LOADING:
      return {
        ...state,
        status: { login: "LOADING" },
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        token: localStorage.getItem("token"),
        isAuth: true,
        status: { login: "SUCCESS" },
      };

    case LOGIN_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuth: false,
        userData: null,
        status: { login: "FAILURE" },
      };

    case REGISTER_LOADING:
      return {
        ...state,
        status: { register: "LOADING" },
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        status: { register: "SUCCESS" },
      };

    case REGISTER_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuth: false,
        userData: null,
        status: { register: "FAILURE" },
      };

    case LOGOUT_LOADING:
      return {
        ...state,
        status: { logout: "LOADING" },
      };

    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuth: false,
        userData: null,
        status: { logout: "SUCCESS" },
      };

    case LOGOUT_FAILURE:
      return {
        ...state,
        status: { logout: "FAILURE" },
      };

    default:
      return state;
  }
}
