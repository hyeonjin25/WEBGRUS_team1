import user from "./userReducer";

const { combineReducers } = require("redux");

//reducer 합치기
const rootReducer = combineReducers({
  user,
});

export default rootReducer;
