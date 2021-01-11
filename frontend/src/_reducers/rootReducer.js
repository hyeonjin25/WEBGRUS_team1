import user from "./userReducer";
import post from "./postReducer";
import favorite from "./favoriteReducer";
import comment from "./commentReducer";
import follow from "./followReducer";

const { combineReducers } = require("redux");

//reducer 합치기
const rootReducer = combineReducers({
  user,
  post,
  favorite,
  comment,
  follow
});

export default rootReducer;
