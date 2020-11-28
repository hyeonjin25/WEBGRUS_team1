import user from "./userReducer";
import post from "./postReducer";

const { combineReducers } = require("redux");

//reducer 합치기
const rootReducer = combineReducers({
  user,
  post,
});

export default rootReducer;
