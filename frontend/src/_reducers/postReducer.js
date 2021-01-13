//상태값 변경: 원래있던 state와 action 합치기
import {
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  GET_POSTDETAIL,
  GET_USERPOSTS,
  GET_ALLPOST,
  POST_MODIFY,
  POST_DELETE,
} from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case UPLOAD_SUCCESS:
      return { ...state, uploadSuccess: action.payload };
      break;

    case UPLOAD_FAILURE:
      return { ...state, err: action.payload };
      break;

    case GET_USERPOSTS:
      return { ...state, myPosts: action.payload };
      break;

    case GET_POSTDETAIL:
      return { ...state, postDetail: action.payload };
      break;

    case GET_ALLPOST:
      return { ...state, allpost: action.payload };
      break;

    case POST_MODIFY:
      return { ...state, postModify: action.payload };
      break;

    case POST_DELETE:
      return { ...state, postDelete: action.payload };
      break;

    default:
      return state;
  }
}
