import { combineReducers } from "@reduxjs/toolkit";
import listReducer from "./slices/listSlice";
import authReducer from "./slices/authSlice/authSlice";

const rootReducer = combineReducers({
  list: listReducer,
  auth: authReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
