import user from "./userReducer";
import post from "./postReducer";
import favorite from "./favoriteReducer";
import comment from "./commentReducer";

const { combineReducers } = require("redux");

//reducer 합치기
const rootReducer = combineReducers({
  user,
  post,
  favorite,
  comment,
});

export default rootReducer;
