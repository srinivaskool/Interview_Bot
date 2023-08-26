import { combineReducers } from "redux";
import { loginRedirectReducer } from "./loginRedirectReducer";
import { userReducer } from "./userReducer";
const rootReducer = combineReducers({
  user: userReducer,
  redirectPage: loginRedirectReducer
});

export default rootReducer;
