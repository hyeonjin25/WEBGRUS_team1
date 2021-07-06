//상태값 변경: 원래있던 state와 action 합치기
import {
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  GET_POSTDETAIL,
  GET_USERPOSTS,
  GET_FAVORITEPOSTS,
  GET_ALLPOST,
  MODIFY_SUCCESS,
  MODIFY_FAILURE,
  POST_DELETE,
} from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case UPLOAD_SUCCESS:
      return { ...state, uploadSuccess: true };
      break;

    case UPLOAD_FAILURE:
      return { ...state, uploadSuccess: false, err: action.payload };
      break;

    case GET_USERPOSTS:
      return { ...state, myPosts: action.payload };
      break;

    case GET_FAVORITEPOSTS:
      return { ...state, myFavoritePosts: action.payload };
      break;

    case GET_POSTDETAIL:
      return { ...state, postDetail: action.payload };
      break;

    case GET_ALLPOST:
      return { ...state, allpost: action.payload };
      break;

    case MODIFY_SUCCESS:
      return { ...state, modifySuccess: true };
      break;

    case MODIFY_FAILURE:
      return { ...state, modifySuccess: false, err: action.payload };
      break;

    case POST_DELETE:
      return { ...state, postDelete: true };
      break;

    default:
      return state;
  }
}
